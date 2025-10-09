// backend/utils/db.js - PostgreSQL pool
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: Number(process.env.DATABASE_PORT || 5432),
  user: process.env.DATABASE_USER || 'fletespro_user',
  password: process.env.DATABASE_PASSWORD || 'fletespro_password123',
  database: process.env.DATABASE_NAME || 'fletespro'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
