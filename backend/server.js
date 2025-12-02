import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - MUST come before routes
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000', // Next.js development
            'http://localhost:3001', // Alternative port
            'http://127.0.0.1:3000',
            'http://localhost:5173', // Vite default
            process.env.CLIENT_URL
        ];

        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request ID middleware - should come early
app.use((req, res, next) => {
    req.id = crypto.randomBytes(16).toString("hex");
    res.setHeader("X-Request-ID", req.id);
    next();
});

// Logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    const logStream = fs.createWriteStream(
        path.join(logsDir, "access.log"),
        { flags: "a" }
    );
    app.use(morgan("combined", { stream: logStream }));
}

// Import routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
// import hostRoute from "./routes/hostRoute.js"; // Commented out as it might not exist or be converted yet


// Health check
app.get("/", (_req, res) => res.send("API is running"));

// API Documentation
app.get("/api", (req, res) => {
    res.json({
        message: "Tourism API",
        version: "1.0.0",
        health: "/health",
        endpoints: {
            users: "/api/users",
            // hosts: "/api/hosts",
            auth: {
                login: "POST /api/users/login",
                register: "POST /api/users",
                profile: "GET /api/users/profile",
                changePassword: "PUT /api/users/change-password"
            }
        },
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development"
    });
});

// Mount user routes under /api prefix
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/hosts", hostRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    // Log error details
    console.error(`[${req.id}] Error:`, err);

    // Handle CORS errors
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS policy violation'
        });
    }

    // Handle other errors
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err.stack,
            requestId: req.id
        })
    });
});

// 404 handler - must be last
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found`,
        requestId: req.id
    });
});

// Clear console in development
if (process.env.NODE_ENV === "development") {
    console.clear();
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 API Documentation at http://localhost:${PORT}/api`);
    console.log(`🏥 Health check at http://localhost:${PORT}/health`);
    console.log(`👤 User endpoints at http://localhost:${PORT}/api/users`);
});