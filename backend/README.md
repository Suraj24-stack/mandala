# Mandala Authentication Backend

Admin-only authentication system with JWT tokens and MongoDB.

## Features

- ✅ Admin authentication with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes
- ✅ MongoDB database
- ✅ Express.js REST API
- ✅ No public signup - admin accounts created via script

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values as needed (especially `MONGODB_URI` and `JWT_SECRET`)

3. Make sure MongoDB is running locally or update `MONGODB_URI` in `.env` to point to your MongoDB instance

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Creating Admin Users

Since there is no public signup page, admin users must be created using the provided script:

1. Edit `createAdmin.js` and update the admin details:
```javascript
const adminData = {
  name: 'Admin User',
  email: 'admin@mandala.com',
  password: 'admin123',  // Change this!
  role: 'admin'
};
```

2. Run the script:
```bash
node createAdmin.js
```

3. The admin can now login at the frontend login page

**Note:** You can run this script multiple times with different email addresses to create multiple admin accounts.


## API Endpoints

### Authentication Routes

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // or "admin"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
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

#### Get All Users
```
GET /api/admin/users
Authorization: Bearer <admin_token>
```

### User Routes (User/Admin)

#### Get User Dashboard
```
GET /api/user/dashboard
Authorization: Bearer <token>
```

#### Get User Profile
```
GET /api/user/profile
Authorization: Bearer <token>
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── models/
│   └── User.js            # User model
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
├── server.js              # Express server
└── package.json           # Dependencies
```

## Testing

You can test the API using curl, Postman, or any HTTP client.

Example: Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"user"}'
```

## Security Notes

- Always use a strong `JWT_SECRET` in production
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement rate limiting for production use
- Consider adding refresh tokens for better security

## License

ISC
