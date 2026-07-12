const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// GET /api/departments - List all departments (all authenticated users)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, head, parent_dept AS parentDept, status FROM departments ORDER BY name ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch departments error:', error);
        res.status(500).json({ error: 'Internal server error fetching departments' });
    }
});

// POST /api/departments - Add new department (Admin only)
router.post('/', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const { name, head, parentDept, status } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Department name is required' });
        }

        const headName = head || '—';
        const parent = parentDept || '—';
        const deptStatus = status || 'Active';

        const [result] = await db.query(
            'INSERT INTO departments (name, head, parent_dept, status) VALUES (?, ?, ?, ?)',
            [name.trim(), headName.trim(), parent.trim(), deptStatus]
        );

        // Log activity
        const activityText = `Department '${name.trim()}' created`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'register')", [activityText]);

        res.status(201).json({
            message: 'Department created successfully',
            department: {
                id: result.insertId,
                name: name.trim(),
                head: headName,
                parentDept: parent,
                status: deptStatus
            }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Department name already exists' });
        }
        console.error('Create department error:', error);
        res.status(500).json({ error: 'Internal server error creating department' });
    }
});

// PUT /api/departments/:id - Update department (Admin only)
router.put('/:id', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, head, parentDept, status } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Department name is required' });
        }

        const headName = head || '—';
        const parent = parentDept || '—';
        const deptStatus = status || 'Active';

        // Check if exists
        const [existing] = await db.query('SELECT name FROM departments WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        await db.query(
            'UPDATE departments SET name = ?, head = ?, parent_dept = ?, status = ? WHERE id = ?',
            [name.trim(), headName.trim(), parent.trim(), deptStatus, id]
        );

        // Log activity
        const activityText = `Department '${name.trim()}' updated`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'register')", [activityText]);

        res.status(200).json({
            message: 'Department updated successfully',
            department: {
                id: parseInt(id),
                name: name.trim(),
                head: headName,
                parentDept: parent,
                status: deptStatus
            }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Department name already exists' });
        }
        console.error('Update department error:', error);
        res.status(500).json({ error: 'Internal server error updating department' });
    }
});

// DELETE /api/departments/:id - Delete department (Admin only)
router.delete('/:id', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const { id } = req.params;

        const [existing] = await db.query('SELECT name FROM departments WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        await db.query('DELETE FROM departments WHERE id = ?', [id]);

        // Log activity
        const activityText = `Department '${existing[0].name}' deleted`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'pending')", [activityText]);

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Delete department error:', error);
        res.status(500).json({ error: 'Internal server error deleting department' });
    }
});

module.exports = router;
