const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');
const auth = require('../middleware/auth');

// Get all users (for admin)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    const userCheck = await sql.query`
      SELECT is_admin FROM Users WHERE id = ${req.user.id}
    `;
    
    if (!userCheck.recordset[0].is_admin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const result = await sql.query`
      SELECT id, username, email, avatar_url, is_admin, created_at
      FROM Users
      ORDER BY created_at DESC
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const result = await sql.query`
      SELECT id, username, email, avatar_url, is_admin, created_at
      FROM Users
      WHERE id = ${req.user.id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, avatar_url } = req.body;
    
    const result = await sql.query`
      UPDATE Users
      SET username = ${username},
          avatar_url = ${avatar_url}
      OUTPUT INSERTED.*
      WHERE id = ${req.user.id}
    `;

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;