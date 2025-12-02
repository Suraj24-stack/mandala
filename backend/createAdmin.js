// Script to create an admin user directly in the database
// Run this with: node createAdmin.js

import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to database
        await sequelize.authenticate();
        console.log('Connected to MySQL');

        // Sync User model
        await sequelize.sync();

        // Admin details - CHANGE THESE VALUES
        const adminData = {
            name: 'Admin User',
            email: 'admin@mandala.com',
            password: 'admin123',  // Change this to a secure password
            role: 'admin'
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ where: { email: adminData.email } });
        if (existingAdmin) {
            console.log('Admin user already exists with this email');
            process.exit(0);
        }

        // Create admin user (password will be hashed automatically)
        const admin = await User.create(adminData);
        console.log('Admin user created successfully!');
        console.log('Email:', admin.email);
        console.log('Role:', admin.role);
        console.log('\nYou can now login at http://localhost:5173/login');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
