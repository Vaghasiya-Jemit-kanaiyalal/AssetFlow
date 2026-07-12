const express = require('express');
const router = express.Router();
const db = require('../Database/db');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// GET /api/admin/users - Get directory list (Admin only)
router.get('/users', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role, department FROM users ORDER BY name ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch users error:', error);
        res.status(500).json({ error: 'Internal server error fetching user directory' });
    }
});

// PATCH /api/admin/users/:id/role - Update user role (Admin only)
router.patch('/users/:id/role', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({ error: 'Role is required' });
        }

        const validRoles = ['Employee', 'Dept Head', 'Asset Manager', 'Admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid user role' });
        }

        // Fetch user name for logging
        const [users] = await db.query('SELECT name FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);

        // Log activity
        const activityText = `User role for ${users[0].name} updated to ${role}`;
        await db.query("INSERT INTO activities (text, badge) VALUES (?, 'register')", [activityText]);

        res.status(200).json({
            message: 'User role updated successfully',
            userId: id,
            role
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ error: 'Internal server error updating user role' });
    }
});

// GET /api/admin/strategy - Get all strategies (Admin only)
router.get('/strategy', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, category, warranty_coverage AS warrantyCoverage, safety_audit AS safetyAudit FROM category_strategies'
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch strategies error:', error);
        res.status(500).json({ error: 'Internal server error fetching strategies' });
    }
});

// PUT /api/admin/strategy - Overwrite strategies array (Admin only)
router.put('/strategy', authenticateToken, requireRole(['Admin']), async (req, res) => {
    try {
        const strategies = req.body;

        if (!Array.isArray(strategies)) {
            return res.status(400).json({ error: 'Body must be an array of category configurations' });
        }

        const categoriesInRequest = [];

        await db.query('START TRANSACTION');

        for (const item of strategies) {
            const categoryName = item.category || item.Category;
            const warranty = item.warrantyCoverage || item.warranty_coverage || '12 Months';
            const safety = item.safetyAudit || item.safety_audit || 'Annually';

            if (!categoryName) {
                await db.query('ROLLBACK');
                return res.status(400).json({ error: 'Each configuration must have a category name' });
            }

            categoriesInRequest.push(categoryName);

            // Upsert strategy
            const [existing] = await db.query('SELECT id FROM category_strategies WHERE category = ?', [categoryName]);
            if (existing.length > 0) {
                await db.query(
                    'UPDATE category_strategies SET warranty_coverage = ?, safety_audit = ? WHERE category = ?',
                    [warranty, safety, categoryName]
                );
            } else {
                await db.query(
                    'INSERT INTO category_strategies (category, warranty_coverage, safety_audit) VALUES (?, ?, ?)',
                    [categoryName, warranty, safety]
                );
            }
        }

        // Deleting old categories that are no longer in the list (if not referenced by assets)
        const [allCats] = await db.query('SELECT id, category FROM category_strategies');
        for (const cat of allCats) {
            if (!categoriesInRequest.includes(cat.category)) {
                try {
                    await db.query('DELETE FROM category_strategies WHERE id = ?', [cat.id]);
                } catch (deleteError) {
                    // Log but ignore, as it indicates a foreign key block
                    console.log(`Retaining category '${cat.category}' (ID: ${cat.id}) due to existing asset relations.`);
                }
            }
        }

        await db.query('COMMIT');

        // Fetch and return the updated categories list
        const [updatedRows] = await db.query(
            'SELECT id, category, warranty_coverage AS warrantyCoverage, safety_audit AS safetyAudit FROM category_strategies'
        );

        res.status(200).json({
            message: 'Strategies updated and synchronized successfully',
            strategies: updatedRows
        });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Update strategies error:', error);
        res.status(500).json({ error: 'Internal server error overwriting strategies' });
    }
});

module.exports = router;
