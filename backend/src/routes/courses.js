const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', auth, async (req, res) => {
  try {
    const result = await sql.query`
      SELECT c.*, u.username as author_name
      FROM Courses c
      JOIN Users u ON c.created_by = u.id
      ORDER BY c.created_at DESC
    `;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new course (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, video_url, thumbnail_url } = req.body;
    
    // Check if user is admin
    const userCheck = await sql.query`
      SELECT is_admin FROM Users WHERE id = ${req.user.id}
    `;
    
    if (!userCheck.recordset[0].is_admin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const result = await sql.query`
      INSERT INTO Courses (title, description, video_url, thumbnail_url, created_by)
      OUTPUT INSERTED.*
      VALUES (${title}, ${description}, ${video_url}, ${thumbnail_url}, ${req.user.id})
    `;

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;