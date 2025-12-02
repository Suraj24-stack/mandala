import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const authenticateToken = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // Debug logging
        console.log('🔐 Auth Header:', authHeader ? 'Present' : 'Missing');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Debug: Log decoded token structure
        console.log('📋 Decoded token:', {
            id: decoded.id,
            userId: decoded.userId,
            email: decoded.email,
            exp: new Date(decoded.exp * 1000).toISOString()
        });

        // Get the user ID from token (handle both 'id' and 'userId' for compatibility)
        const userId = decoded.id || decoded.userId;

        if (!userId) {
            console.error('❌ No user ID in token');
            return res.status(401).json({
                success: false,
                message: 'Invalid token structure'
            });
        }

        // Get user from database
        const [users] = await pool.execute(
            'SELECT id, email, role, name FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            console.error('❌ User not found in database for ID:', userId);
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Attach user to request object
        req.user = users[0];
        console.log('✅ User authenticated:', req.user.name, '(', req.user.role, ')');

        next();
    } catch (error) {
        console.error('❌ Auth error:', error.message);

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }

        return res.status(403).json({
            success: false,
            message: 'Token verification failed'
        });
    }
};

const requireAdmin = (req, res, next) => {
    console.log('🔐 Checking admin access for user:', req.user?.email, 'Role:', req.user?.role);

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (req.user.role !== 'admin') {
        console.log('❌ Access denied: User role is', req.user.role, 'but admin required');
        return res.status(403).json({
            success: false,
            message: 'Admin access required',
            userRole: req.user.role
        });
    }

    console.log('✅ Admin access granted');
    next();
};

// Optional: Middleware for optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded.userId;

        if (userId) {
            const [users] = await pool.execute(
                'SELECT id, email, role, name FROM users WHERE id = ?',
                [userId]
            );

            req.user = users.length > 0 ? users[0] : null;
        } else {
            req.user = null;
        }

        next();
    } catch (error) {
        console.log('⚠️ Optional auth failed:', error.message);
        req.user = null;
        next();
    }
};

export {
    authenticateToken,
    requireAdmin,
    optionalAuth
};