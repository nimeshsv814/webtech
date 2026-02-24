// dbmodule.js — MySQL version
require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a reusable connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,           // tune if needed
  idleTimeout: 60000,            // 60s
  enableKeepAlive: true
});

/**
 * Create a new user
 * @param {Object} user { name, email, passwordHash }
 */
async function createUser({ name, email, passwordHash }) {
  const sql = `
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [name, email, passwordHash]);
  return result.insertId;
}

/**
 * Find a user by email
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
async function findUserByEmail(email) {
  const sql = `SELECT id, name, email, password_hash, created_at FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [email]);
  return rows.length ? rows[0] : null;
}

/**
 * (Optional) Health check
 */
async function ping() {
  const [rows] = await pool.query('SELECT 1 AS ok');
  return rows[0].ok === 1;
}

module.exports = {
  pool,
  createUser,
  findUserByEmail,
  ping
};
``