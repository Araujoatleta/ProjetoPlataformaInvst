const express = require('express');
const router = express.Router();
const { sql } = require('../config/db');
const auth = require('../middleware/auth');

// Get user's messages
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await sql.query`
      SELECT m.*, 
        sender.username as sender_name,
        receiver.username as receiver_name
      FROM Messages m
      JOIN Users sender ON m.sender_id = sender.id
      JOIN Users receiver ON m.receiver_id = receiver.id
      WHERE (m.sender_id = ${req.user.id} AND m.receiver_id = ${userId})
         OR (m.sender_id = ${userId} AND m.receiver_id = ${req.user.id})
      ORDER BY m.created_at ASC
    `;

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/', auth, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    
    const result = await sql.query`
      INSERT INTO Messages (sender_id, receiver_id, content)
      OUTPUT INSERTED.*
      VALUES (${req.user.id}, ${receiver_id}, ${content})
    `;

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;