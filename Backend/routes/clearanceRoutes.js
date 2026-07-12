const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// GET /api/clearance - Dept Head views pending requests for their department
router.get('/', authenticateToken, requireRole(['Dept Head', 'Admin']), async (req, res) => {
    try {
        const department = req.user.department;
        const [rows] = await db.query(
            `SELECT 
                cr.id, 
                a.name AS assetName, 
                cr.request_type AS requestType, 
                fu.name AS fromUser, 
                tu.name AS toUser, 
                COALESCE(tu.department, '—') AS department, 
                cr.notes, 
                cr.status
            FROM clearance_requests cr
            JOIN assets a ON cr.asset_id = a.id
            JOIN users fu ON cr.from_user_id = fu.id
            JOIN users tu ON cr.to_user_id = tu.id
            WHERE cr.status = 'Pending' AND (a.department = ? OR fu.department = ? OR tu.department = ?)`
            , [department, department, department]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch clearances error:', error);
        res.status(500).json({ error: 'Internal server error fetching clearances' });
    }
});

// POST /api/clearance - Create a new clearance/transfer request
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { assetId, recipientName, notes } = req.body;
        if (!assetId || !recipientName) {
            return res.status(400).json({ error: 'Asset ID and recipient name are required' });
        }

        // Find recipient user by name
        const [users] = await db.query('SELECT id, department FROM users WHERE name = ?', [recipientName]);
        if (users.length === 0) {
            return res.status(404).json({ error: `Recipient user '${recipientName}' not found` });
        }
        const toUserId = users[0].id;

        // Find asset details
        const [assets] = await db.query('SELECT name, custodian_id FROM assets WHERE id = ?', [assetId]);
        if (assets.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        const fromUserId = assets[0].custodian_id || req.user.id;

        await db.query('START TRANSACTION');

        // Create request
        const [result] = await db.query(
            `INSERT INTO clearance_requests (asset_id, request_type, from_user_id, to_user_id, notes, status) 
             VALUES (?, 'Transfer', ?, ?, ?, 'Pending')`,
            [assetId, fromUserId, toUserId, notes || '']
        );

        // Update asset status to PENDING
        await db.query("UPDATE assets SET lifecycle_status = 'PENDING' WHERE id = ?", [assetId]);

        // Log activity
        const activityText = `Transfer request logged for ${assets[0].name}`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'pending')", [activityText]);

        await db.query('COMMIT');

        res.status(201).json({
            message: 'Clearance request submitted successfully',
            requestId: result.insertId
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Create clearance request error:', error);
        res.status(500).json({ error: 'Internal server error submitting request' });
    }
});

// POST /api/clearance/:id/approve - Approve transfer request
router.post('/:id/approve', authenticateToken, requireRole(['Dept Head', 'Admin']), async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Fetch the request details
        const [requests] = await db.query(
            `SELECT cr.asset_id, cr.to_user_id, a.name AS assetName, tu.name AS toUserName, tu.department AS toUserDept 
             FROM clearance_requests cr
             JOIN assets a ON cr.asset_id = a.id
             JOIN users tu ON cr.to_user_id = tu.id
             WHERE cr.id = ?`,
            [id]
        );

        if (requests.length === 0) {
            return res.status(404).json({ error: 'Clearance request not found' });
        }

        const { asset_id, to_user_id, assetName, toUserName, toUserDept } = requests[0];

        await db.query('START TRANSACTION');

        // 2. Update the asset custodian & department, status set to ALLOCATED
        await db.query(
            `UPDATE assets SET custodian_id = ?, department = ?, lifecycle_status = 'ALLOCATED' WHERE id = ?`,
            [to_user_id, toUserDept, asset_id]
        );

        // 3. Delete the request
        await db.query('DELETE FROM clearance_requests WHERE id = ?', [id]);

        // 4. Log activity
        const activityText = `Transfer of ${assetName} to ${toUserName} approved`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'allocation')", [activityText]);

        await db.query('COMMIT');

        res.status(200).json({
            message: 'Clearance request approved successfully',
            assetId: asset_id,
            custodian: toUserName,
            department: toUserDept,
            status: 'ALLOCATED'
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Approve clearance error:', error);
        res.status(500).json({ error: 'Internal server error approving clearance' });
    }
});

// POST /api/clearance/:id/reject - Reject transfer request
router.post('/:id/reject', authenticateToken, requireRole(['Dept Head', 'Admin']), async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Fetch the request details
        const [requests] = await db.query(
            `SELECT cr.asset_id, a.name AS assetName, tu.name AS toUserName 
             FROM clearance_requests cr
             JOIN assets a ON cr.asset_id = a.id
             JOIN users tu ON cr.to_user_id = tu.id
             WHERE cr.id = ?`,
            [id]
        );

        if (requests.length === 0) {
            return res.status(404).json({ error: 'Clearance request not found' });
        }

        const { asset_id, assetName, toUserName } = requests[0];

        await db.query('START TRANSACTION');

        // 2. Reset asset status to ALLOCATED (or previous status)
        await db.query(
            `UPDATE assets SET lifecycle_status = 'ALLOCATED' WHERE id = ?`,
            [asset_id]
        );

        // 3. Delete the request
        await db.query('DELETE FROM clearance_requests WHERE id = ?', [id]);

        // 4. Log activity
        const activityText = `Transfer of ${assetName} to ${toUserName} rejected`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'pending')", [activityText]);

        await db.query('COMMIT');

        res.status(200).json({
            message: 'Clearance request rejected successfully',
            assetId: asset_id,
            status: 'ALLOCATED'
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Reject clearance error:', error);
        res.status(500).json({ error: 'Internal server error rejecting clearance' });
    }
});

module.exports = router;
