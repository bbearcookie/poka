import mysql from 'mysql2/promise';

const options = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  connectionLimit: 30,
};

const pool = mysql.createPool(options);

export default pool;