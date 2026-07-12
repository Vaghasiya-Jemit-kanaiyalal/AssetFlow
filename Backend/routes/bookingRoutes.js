const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Helper to parse dates and timeslots (e.g., "10:00 AM - 12:00 PM") to Date objects
function parseTimeSlot(dateStr, timeSlotStr) {
    const defaultStart = new Date(dateStr || new Date());
    const defaultEnd = new Date(defaultStart.getTime() + 2 * 60 * 60 * 1000);

    if (!timeSlotStr) {
        return { startTime: defaultStart, endTime: defaultEnd };
    }

    try {
        const match = timeSlotStr.match(/(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) {
            return { startTime: defaultStart, endTime: defaultEnd };
        }
        
        let [_, startH, startM, startAp, endH, endM, endAp] = match;
        let sH = parseInt(startH, 10);
        let sM = parseInt(startM, 10);
        let eH = parseInt(endH, 10);
        let eM = parseInt(endM, 10);

        if (startAp.toUpperCase() === 'PM' && sH !== 12) sH += 12;
        if (startAp.toUpperCase() === 'AM' && sH === 12) sH = 0;
        if (endAp.toUpperCase() === 'PM' && eH !== 12) eH += 12;
        if (endAp.toUpperCase() === 'AM' && eH === 12) eH = 0;

        const dateBase = dateStr ? dateStr : new Date().toISOString().split('T')[0];
        const startTime = new Date(`${dateBase}T${String(sH).padStart(2, '0')}:${String(sM).padStart(2, '0')}:00`);
        const endTime = new Date(`${dateBase}T${String(eH).padStart(2, '0')}:${String(eM).padStart(2, '0')}:00`);
        
        return { startTime, endTime };
    } catch (e) {
        return { startTime: defaultStart, endTime: defaultEnd };
    }
}

// GET /api/bookings - Get all resource bookings
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [bookings] = await db.query(
            `SELECT rb.id, rb.start_time AS startTime, rb.end_time AS endTime, rb.status, 
                    a.name AS resourceName, u.name AS userName, u.department
             FROM resource_bookings rb
             JOIN assets a ON rb.asset_id = a.id
             JOIN users u ON rb.user_id = u.id
             ORDER BY rb.start_time ASC`
        );
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Fetch bookings error:', error);
        res.status(500).json({ error: 'Internal server error fetching bookings' });
    }
});

// POST /api/bookings - Create new resource reservation
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { resource, type, timeSlot, date, priority } = req.body;

        if (!resource) {
            return res.status(400).json({ error: 'Resource name is required' });
        }

        const isPriority = priority && req.user.role === 'Dept Head';
        const finalResourceName = isPriority ? `[PRIORITY] ${resource}` : resource;

        // Parse slot times
        const { startTime, endTime } = parseTimeSlot(date, timeSlot);

        // Strip prefix for comparison check
        const baseResourceName = resource.replace(/^\[PRIORITY\]\s*/, '');

        // Check for double booking conflicts (overlapping intervals)
        const [overlap] = await db.query(
            `SELECT rb.id 
             FROM resource_bookings rb
             JOIN assets a ON rb.asset_id = a.id
             WHERE (a.name = ? OR a.name = CONCAT('[PRIORITY] ', ?))
               AND rb.status IN ('Upcoming', 'Ongoing')
               AND rb.start_time < ? 
               AND rb.end_time > ?`,
            [baseResourceName, baseResourceName, endTime, startTime]
        );

        if (overlap.length > 0) {
            return res.status(400).json({ error: 'This resource is already booked by someone else for the selected date and time slot.' });
        }

        // 1. Resolve category_id (default to type || 'AV System' or search it)
        let categoryId;
        const categoryName = type || 'AV System';
        const [categories] = await db.query("SELECT id FROM category_strategies WHERE category = ?", [categoryName]);
        if (categories.length > 0) {
            categoryId = categories[0].id;
        } else {
            const [catResult] = await db.query(
                "INSERT INTO category_strategies (category, warranty_coverage, safety_audit) VALUES (?, '24 Months', 'Quarterly')",
                [categoryName]
            );
            categoryId = catResult.insertId;
        }

        // 2. Auto-generate asset_tag and serial_number
        const assetTag = 'AST-BKG-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
        const serialNumber = 'SN-BKG-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4);

        // 3. Insert new booking row into assets table
        const [assetResult] = await db.query(
            `INSERT INTO assets 
                (name, asset_tag, serial_number, category_id, location, lifecycle_status, custodian_id, department, is_shared_bookable)
             VALUES (?, ?, ?, ?, ?, 'ACTIVE BOOKING', ?, ?, TRUE)`,
            [finalResourceName, assetTag, serialNumber, categoryId, 'Meeting Room C', req.user.id, req.user.department]
        );

        const assetId = assetResult.insertId;

        // 4. Create resource_bookings record
        await db.query(
            `INSERT INTO resource_bookings (asset_id, user_id, start_time, end_time, status) VALUES (?, ?, ?, ?, 'Upcoming')`,
            [assetId, req.user.id, startTime, endTime]
        );

        // 5. Log activity
        const activityText = `${isPriority ? '[PRIORITY] ' : ''}${resource} reserved for ${date || 'upcoming session'}`;
        await db.query('INSERT INTO activities (text, badge) VALUES (?, ?)', [activityText, 'booking']);

        res.status(201).json({
            message: 'Booking created successfully',
            asset: {
                id: assetId,
                name: finalResourceName,
                status: 'ACTIVE BOOKING',
                custodian: req.user.name,
                department: req.user.department
            }
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ error: 'Internal server error creating reservation' });
    }
});

module.exports = router;
