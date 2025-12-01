import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL Connected: ${process.env.DB_HOST}`);

    // Sync all models with database
    await sequelize.sync({ alter: false }); // Use { force: true } to drop tables on restart
    console.log('Database synchronized');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;
