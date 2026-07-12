const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET /api/activities - Retrieve recent activity logs
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, text, badge, created_at FROM activities ORDER BY created_at DESC LIMIT 50');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch activities error:', error);
        res.status(500).json({ error: 'Internal server error fetching activities' });
    }
});

module.exports = router;
