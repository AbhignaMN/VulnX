const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, host(ip) AS ip, hostname, status, created_at FROM assets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new asset
router.post('/', async (req, res) => {
  const { ip, hostname } = req.body || {};
  if (typeof ip !== 'string' || !ip.trim()) return res.status(400).json({ error: 'A valid IPv4 or IPv6 address is required.' });
  if (hostname !== undefined && (typeof hostname !== 'string' || hostname.length > 253)) return res.status(400).json({ error: 'Hostname must be a string of at most 253 characters.' });
  try {
    const result = await db.query(
      'INSERT INTO assets (ip, hostname) VALUES ($1, $2) RETURNING id, host(ip) AS ip, hostname, status, created_at',
      [ip.trim(), hostname?.trim() || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '22P02') return res.status(400).json({ error: 'A valid IPv4 or IPv6 address is required.' });
    if (err.code === '23505') return res.status(409).json({ error: 'An asset with this IP address already exists.' });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
