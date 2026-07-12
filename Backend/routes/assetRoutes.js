const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// GET /api/assets - Role-aware listing
router.get('/', authenticateToken, async (req, res) => {
    try {
        let query = `
            SELECT 
                a.id, 
                a.name, 
                COALESCE(cs.category, 'Electronics') AS type, 
                a.location, 
                a.lifecycle_status AS status, 
                COALESCE(u.name, '—') AS custodian, 
                COALESCE(a.department, '—') AS department, 
                a.asset_tag, 
                a.serial_number, 
                a.is_shared_bookable, 
                COALESCE(a.image_url, '/uploads/placeholders/generic-asset.png') AS image_url, 
                a.created_at
            FROM assets a
            LEFT JOIN category_strategies cs ON a.category_id = cs.id
            LEFT JOIN users u ON a.custodian_id = u.id
        `;
        let params = [];

        if (req.user.role === 'Employee') {
            query += ` WHERE a.custodian_id = ? OR u.name = ? OR a.lifecycle_status = 'AVAILABLE'`;
            params.push(req.user.id, req.user.name);
        } else if (req.user.role === 'Dept Head') {
            query += ` WHERE a.department = ? OR a.lifecycle_status = 'AVAILABLE'`;
            params.push(req.user.department);
        } // Asset Manager and Admin see all, so no WHERE clause is added

        query += ` ORDER BY a.created_at DESC`;

        const [rows] = await db.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch assets error:', error);
        res.status(500).json({ error: 'Internal server error fetching assets' });
    }
});

// POST /api/assets - Add new inventory item (Admin / Asset Manager only)
router.post('/', authenticateToken, requireRole(['Admin', 'Asset Manager']), async (req, res) => {
    try {
        const { name, type, location, custodian, department, status, is_shared_bookable, image_url } = req.body;

        if (!name || !type || !location) {
            return res.status(400).json({ error: 'Name, type (category), and location are required' });
        }

        // 1. Resolve category_id (create category strategy if it doesn't exist)
        let categoryId;
        const [categories] = await db.query('SELECT id FROM category_strategies WHERE category = ?', [type]);
        if (categories.length > 0) {
            categoryId = categories[0].id;
        } else {
            const [catResult] = await db.query(
                'INSERT INTO category_strategies (category, warranty_coverage, safety_audit) VALUES (?, ?, ?)',
                [type, '12 Months', 'Annually']
            );
            categoryId = catResult.insertId;
        }

        // 2. Resolve custodian_id if custodian name is provided
        let custodianId = null;
        if (custodian && custodian !== '—') {
            const [users] = await db.query('SELECT id FROM users WHERE name = ?', [custodian]);
            if (users.length > 0) {
                custodianId = users[0].id;
            }
        }

        // 3. Generate unique asset_tag and serial_number
        const assetTag = 'AST-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
        const serialNumber = 'SN-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4);

        const dept = department || '—';
        const lifecycleStatus = status || 'AVAILABLE';
        const isShared = is_shared_bookable ? 1 : 0;
        const imgUrl = image_url || '/uploads/placeholders/generic-asset.png';

        // 4. Insert the new asset row
        const [result] = await db.query(
            `INSERT INTO assets 
                (name, asset_tag, serial_number, category_id, location, lifecycle_status, custodian_id, department, is_shared_bookable, image_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, assetTag, serialNumber, categoryId, location, lifecycleStatus, custodianId, dept, isShared, imgUrl]
        );

        // 5. Log activity
        const activityText = `New ${name} registered`;
        await db.query('INSERT INTO activities (text, badge) VALUES (?, ?)', [activityText, 'register']);

        res.status(201).json({
            message: 'Asset registered successfully',
            asset: {
                id: result.insertId,
                name,
                asset_tag: assetTag,
                serial_number: serialNumber,
                category_id: categoryId,
                type,
                location,
                status: lifecycleStatus,
                custodian: custodian || '—',
                department: dept,
                is_shared_bookable: isShared,
                image_url: imgUrl
            }
        });
    } catch (error) {
        console.error('Register asset error:', error);
        res.status(500).json({ error: 'Internal server error registering asset' });
    }
});

// PATCH /api/assets/:id/status - Toggle status to DAMAGED or MISSING (Asset Manager only)
router.patch('/:id/status', authenticateToken, requireRole(['Asset Manager']), async (req, res) => {
    try {
        const { id } = req.params;
        const { status, type } = req.body;
        const finalStatus = (status || type || '').toUpperCase();

        if (finalStatus !== 'DAMAGED' && finalStatus !== 'MISSING' && finalStatus !== 'AVAILABLE') {
            return res.status(400).json({ error: 'Status must be DAMAGED, MISSING, or AVAILABLE' });
        }

        // Retrieve asset name for activity logging
        const [assets] = await db.query('SELECT name FROM assets WHERE id = ?', [id]);
        if (assets.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        await db.query('UPDATE assets SET lifecycle_status = ? WHERE id = ?', [finalStatus, id]);

        // Log activity
        const activityText = `Audit check: ${assets[0].name} marked as ${finalStatus}`;
        await db.query('INSERT INTO activities (text, badge) VALUES (?, ?)', [activityText, 'pending']);

        res.status(200).json({
            message: `Asset status updated to ${finalStatus}`,
            assetId: id,
            status: finalStatus
        });
    } catch (error) {
        console.error('Update asset status error:', error);
        res.status(500).json({ error: 'Internal server error updating asset status' });
    }
});

// POST /api/assets/:id/return - Return an asset
router.post('/:id/return', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const [assets] = await db.query('SELECT name, custodian_id FROM assets WHERE id = ?', [id]);
        if (assets.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        const asset = assets[0];

        await db.query("UPDATE assets SET lifecycle_status = 'PENDING' WHERE id = ?", [id]);

        // Log activity
        const activityText = `Return sequence initiated for ${asset.name}`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'pending')", [activityText]);

        res.status(200).json({ message: 'Return sequence initiated', status: 'PENDING' });
    } catch (error) {
        console.error('Return asset error:', error);
        res.status(500).json({ error: 'Internal server error returning asset' });
    }
});

module.exports = router;
