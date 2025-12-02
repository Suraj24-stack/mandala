import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import * as User from '../models/User.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(authenticateToken);
router.use(requireAdmin);

// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', async (req, res) => {
    try {
        const stats = await User.getStats();

        res.status(200).json({
            success: true,
            data: {
                ...stats,
                message: 'Welcome to Admin Dashboard'
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const role = req.query.role || '';

        const result = await User.findAll({ page, limit, search, role });

        res.status(200).json({
            success: true,
            count: result.rows.length,
            total: result.total,
            data: result.rows,
            pagination: result.pagination
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
