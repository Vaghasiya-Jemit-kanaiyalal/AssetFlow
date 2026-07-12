const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../Database/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_assetflow';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const validateEmail = (val) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(val).toLowerCase());
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!validateEmail(email.trim())) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const dept = department || '—';
        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, role, department) VALUES (?, ?, ?, ?, ?)',
            [name.trim(), email.toLowerCase().trim(), passwordHash, 'Employee', dept]
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: result.insertId,
                name: name.trim(),
                email: email.toLowerCase().trim(),
                role: 'Employee',
                department: dept
            }
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already registered' });
        }
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json({ error: 'Email is required' });
        }
        if (!validateEmail(email.trim())) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: payload
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
});

module.exports = router;
