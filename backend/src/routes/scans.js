const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.id, s.asset_id AS "assetId", host(a.ip) AS target, s.status,
             s.findings_count AS findings, s.created_at AS "createdAt"
      FROM scans s JOIN assets a ON a.id = s.asset_id ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Unable to load scans.' });
  }
});

// Trigger a new scan
router.post('/', async (req, res) => {
  const { assetId } = req.body || {};
  if (!Number.isSafeInteger(Number(assetId)) || Number(assetId) < 1) return res.status(400).json({ error: 'A valid assetId is required.' });
  try {
    const result = await db.query('INSERT INTO scans (asset_id) VALUES ($1) RETURNING id, asset_id AS "assetId", status, findings_count AS findings, created_at AS "createdAt"', [Number(assetId)]);
    res.status(202).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23503') return res.status(404).json({ error: 'Asset not found.' });
    res.status(500).json({ error: err.message });
  }
});

// Get scan results
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.id, s.asset_id AS "assetId", host(a.ip) AS target, s.status,
             s.findings_count AS findings, s.created_at AS "createdAt", s.completed_at AS "completedAt"
      FROM scans s JOIN assets a ON a.id = s.asset_id WHERE s.id = $1
    `, [req.params.id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Scan not found.' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
