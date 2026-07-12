const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// POST /api/bookings - Create new resource reservation
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { resource, timeSlot, date, priority } = req.body;

        if (!resource) {
            return res.status(400).json({ error: 'Resource name is required' });
        }

        const isPriority = priority && req.user.role === 'Dept Head';
        const finalResourceName = isPriority ? `[PRIORITY] ${resource}` : resource;

        // 1. Resolve category_id (default to 'AV System' or search it)
        let categoryId;
        const [categories] = await db.query("SELECT id FROM category_strategies WHERE category = 'AV System'");
        if (categories.length > 0) {
            categoryId = categories[0].id;
        } else {
            const [catResult] = await db.query(
                "INSERT INTO category_strategies (category, warranty_coverage, safety_audit) VALUES ('AV System', '24 Months', 'Quarterly')"
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
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours
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
