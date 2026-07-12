const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors({
    origin: '*', // Allow all origins for the dashboard interface
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets placeholders if any exist
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes mapping
const authRoutes = require('./routes/authRoutes');
const assetRoutes = require('./routes/assetRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const issueRoutes = require('./routes/issueRoutes');
const clearanceRoutes = require('./routes/clearanceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const activityRoutes = require('./routes/activityRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/clearance', clearanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activities', activityRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred on the server' });
});

app.listen(PORT, () => {
    console.log(`AssetFlow Backend Server listening on port ${PORT}`);
});
