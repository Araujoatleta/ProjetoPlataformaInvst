const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const result = await sql.query`
      SELECT p.*, u.username as author_name,
        (SELECT COUNT(*) FROM Likes WHERE post_id = p.id) as likes_count
      FROM Posts p
      JOIN Users u ON p.author_id = u.id
      ORDER BY p.created_at DESC
    `;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const result = await sql.query`
      INSERT INTO Posts (content, author_id)
      OUTPUT INSERTED.*
      VALUES (${content}, ${req.user.id})
    `;

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if already liked
    const likeCheck = await sql.query`
      SELECT * FROM Likes
      WHERE post_id = ${id} AND user_id = ${req.user.id}
    `;
    
    if (likeCheck.recordset.length > 0) {
      // Unlike
      await sql.query`
        DELETE FROM Likes
        WHERE post_id = ${id} AND user_id = ${req.user.id}
      `;
      res.json({ message: 'Post unliked' });
    } else {
      // Like
      await sql.query`
        INSERT INTO Likes (post_id, user_id)
        VALUES (${id}, ${req.user.id})
      `;
      res.json({ message: 'Post liked' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;