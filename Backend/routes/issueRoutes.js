const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// POST /api/issues - Report/Log an issue
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { assetId, asset_id, details, photo, photo_description } = req.body;
        const targetAssetId = assetId || asset_id;
        const problemDetails = details;
        const problemPhoto = photo || photo_description || '';

        if (!targetAssetId || !problemDetails) {
            return res.status(400).json({ error: 'Asset ID and issue details are required' });
        }

        // Verify the asset exists
        const [assets] = await db.query('SELECT name FROM assets WHERE id = ?', [targetAssetId]);
        if (assets.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        const [result] = await db.query(
            `INSERT INTO issues (asset_id, reported_by_id, details, photo_description, status) VALUES (?, ?, ?, ?, 'Awaiting Action')`,
            [targetAssetId, req.user.id, problemDetails, problemPhoto]
        );

        res.status(201).json({
            message: 'Issue reported successfully',
            issue: {
                id: result.insertId,
                asset_id: targetAssetId,
                assetName: assets[0].name,
                reportedBy: req.user.name,
                details: problemDetails,
                photo_description: problemPhoto,
                status: 'Awaiting Action'
            }
        });
    } catch (error) {
        console.error('Report issue error:', error);
        res.status(500).json({ error: 'Internal server error logging issue' });
    }
});

// GET /api/issues - List all reported problems
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                i.id, 
                i.asset_id, 
                a.name AS assetName, 
                u.name AS reportedBy, 
                i.details, 
                COALESCE(i.photo_description, '') AS photo_description, 
                i.status, 
                i.created_at
            FROM issues i 
            JOIN assets a ON i.asset_id = a.id 
            JOIN users u ON i.reported_by_id = u.id 
            ORDER BY i.created_at DESC
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch issues error:', error);
        res.status(500).json({ error: 'Internal server error fetching issues' });
    }
});

// POST /api/issues/:id/dispatch - Dispatch asset to maintenance shop
router.post('/:id/dispatch', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve issue and asset details
        const [issues] = await db.query('SELECT asset_id FROM issues WHERE id = ?', [id]);
        if (issues.length === 0) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        const assetId = issues[0].asset_id;

        const [assets] = await db.query('SELECT name FROM assets WHERE id = ?', [assetId]);
        if (assets.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        // Get Maintenance Shop user ID (from seed users)
        const [mShop] = await db.query("SELECT id FROM users WHERE name = 'Maintenance Shop'");
        const mShopId = mShop.length > 0 ? mShop[0].id : null;

        // Start transaction to execute both updates atomatically
        await db.query('START TRANSACTION');
        
        await db.query("UPDATE issues SET status = 'Under Maintenance' WHERE id = ?", [id]);
        await db.query("UPDATE assets SET lifecycle_status = 'PENDING', custodian_id = ? WHERE id = ?", [mShopId, assetId]);
        
        // Log activity
        const activityText = `${assets[0].name} dispatched for maintenance; custodian set to Maintenance Shop`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'pending')", [activityText]);

        await db.query('COMMIT');

        res.status(200).json({
            message: 'Asset dispatched successfully for maintenance',
            assetName: assets[0].name,
            status: 'PENDING',
            custodian: 'Maintenance Shop'
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Dispatch maintenance error:', error);
        res.status(500).json({ error: 'Internal server error dispatching maintenance' });
    }
});

// POST /api/issues/:id/resolve - Resolve problem log and reset asset status
router.post('/:id/resolve', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve issue and asset details
        const [issues] = await db.query('SELECT asset_id FROM issues WHERE id = ?', [id]);
        if (issues.length === 0) {
            return res.status(404).json({ error: 'Issue not found' });
        }
        const assetId = issues[0].asset_id;

        const [assets] = await db.query('SELECT name FROM assets WHERE id = ?', [assetId]);
        if (assets.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        await db.query('START TRANSACTION');

        await db.query('DELETE FROM issues WHERE id = ?', [id]);
        await db.query("UPDATE assets SET lifecycle_status = 'AVAILABLE', custodian_id = NULL, department = '—' WHERE id = ?", [assetId]);

        // Log activity
        const activityText = `Maintenance resolved: ${assets[0].name} returned to inventory`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'register')", [activityText]);

        await db.query('COMMIT');

        res.status(200).json({
            message: 'Maintenance resolved, asset returned to inventory',
            assetName: assets[0].name,
            status: 'AVAILABLE',
            custodian: '—'
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Resolve issue error:', error);
        res.status(500).json({ error: 'Internal server error resolving issue' });
    }
});

module.exports = router;
