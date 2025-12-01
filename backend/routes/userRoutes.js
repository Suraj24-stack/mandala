import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleAuth.js';

const router = express.Router();

// All routes are protected and require user role
router.use(protect);
router.use(authorize('user', 'admin')); // Both user and admin can access

// @desc    Get user dashboard data
// @route   GET /api/user/dashboard
// @access  Private/User
router.get('/dashboard', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: {
                message: 'Welcome to User Dashboard',
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    role: req.user.role
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private/User
router.get('/profile', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                createdAt: req.user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
