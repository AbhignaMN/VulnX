const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'vulnx',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'vulnx_db',
  password: process.env.DB_PASSWORD || 'vulnx_password',
  port: process.env.DB_PORT || 5432,
});

async function initialize() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id BIGSERIAL PRIMARY KEY,
      ip INET NOT NULL UNIQUE,
      hostname TEXT,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS scans (
      id BIGSERIAL PRIMARY KEY,
      asset_id BIGINT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'completed', 'failed')),
      findings_count INTEGER NOT NULL DEFAULT 0 CHECK (findings_count >= 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMPTZ
    );
  `);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  initialize,
};
