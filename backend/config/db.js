import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mandala_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  timezone: '+00:00'
});

pool.getConnection()
  .then(conn => {
    console.log("✅ Database connected successfully");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
  });

export default pool;