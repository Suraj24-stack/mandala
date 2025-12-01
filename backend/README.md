# Mandala Authentication Backend - MySQL

Admin-only authentication system with JWT tokens and MySQL database.

## Features

- ✅ Admin authentication with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes
- ✅ MySQL database with Sequelize ORM
- ✅ Express.js REST API
- ✅ No public signup - admin accounts created via script

## Prerequisites

- Node.js (v16 or higher)
- **MySQL Server** (v5.7 or higher)

## MySQL Setup

### 1. Install MySQL

If you don't have MySQL installed:
- **Windows**: Download from [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- **Mac**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

### 2. Start MySQL Service

- **Windows**: MySQL should start automatically, or use Services app
- **Mac**: `brew services start mysql`
- **Linux**: `sudo systemctl start mysql`

### 3. Create Database

Login to MySQL and create the database:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE mandala_auth;
exit;
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the MySQL credentials:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=mandala_auth
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     ```

3. The database tables will be created automatically when you start the server

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will:
1. Connect to MySQL
2. Create the `users` table automatically
3. Start on `http://localhost:5000`

## Creating Admin Users

Since there is no public signup page, admin users must be created using the provided script:

1. Make sure the server has run at least once (to create tables)

2. Edit `createAdmin.js` and update the admin details:
```javascript
const adminData = {
  name: 'Admin User',
  email: 'admin@mandala.com',
  password: 'admin123',  // Change this!
  role: 'admin'
};
```

3. Run the script:
```bash
node createAdmin.js
```

4. The admin can now login at the frontend login page

**Note:** You can run this script multiple times with different email addresses to create multiple admin accounts.

## API Endpoints

### Authentication Routes

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@mandala.com",
  "password": "admin123"
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout (Protected)
```
POST /api/auth/logout
Authorization: Bearer <token>
```

### Admin Routes (Admin Only)

#### Get Dashboard Stats
```
GET /api/admin/dashboard
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 5,
    "totalAdmins": 2,
    "totalRegularUsers": 3,
    "message": "Welcome to Admin Dashboard"
  }
}
```

#### Get All Users
```
GET /api/admin/users
Authorization: Bearer <admin_token>
```

## Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, Auto Increment) | User ID |
| name | VARCHAR(50) | User's full name |
| email | VARCHAR(100) | Unique email address |
| password | VARCHAR(255) | Hashed password |
| role | ENUM('user', 'admin') | User role |
| createdAt | DATETIME | Creation timestamp |
| updatedAt | DATETIME | Last update timestamp |

## Project Structure

```
backend/
├── config/
│   └── db.js              # MySQL/Sequelize connection
├── models/
│   └── User.js            # User model (Sequelize)
├── controllers/
│   └── authController.js  # Auth logic
├── middleware/
│   ├── auth.js            # JWT verification
│   └── roleAuth.js        # Role authorization
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── adminRoutes.js     # Admin endpoints
│   └── userRoutes.js      # User endpoints
├── .env                   # Environment variables
├── createAdmin.js         # Admin creation script
├── server.js              # Express server
└── package.json           # Dependencies
```

## Troubleshooting

### MySQL Connection Error

If you see "Access denied for user":
1. Check your MySQL username and password in `.env`
2. Make sure MySQL service is running
3. Verify the database exists: `SHOW DATABASES;`

### Database Not Found

If you see "Unknown database":
```bash
mysql -u root -p
CREATE DATABASE mandala_auth;
```

### Port Already in Use

If port 5000 is busy, change `PORT` in `.env` file

## Security Notes

- Always use a strong `JWT_SECRET` in production
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement rate limiting for production use
- Use strong MySQL passwords
- Consider adding refresh tokens for better security

## License

ISC
