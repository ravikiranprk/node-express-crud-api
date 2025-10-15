import express from 'express';
import db from '../database.js';

const router = express.Router();

// get all users
router.get("/", (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  })
})

// get a user
router.get("/:id", (req, res) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  })
})

// create a user
router.post("/", (req, res) => {
  const { email, password } = req.body;
  
  db.run(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, email, password });
      }
    }
  )
})

// update a user
router.put("/:id", (req, res) => {
  const { email, password } = req.body;
  
  db.run(
    `UPDATE users SET email = ?, password = ? WHERE id = ?`,
    [email, password, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json({ id: req.params.id, email, password });
      }
    }
  )
})

// delete a user
router.delete("/:id", (req, res) => {
  db.run(
    `DELETE FROM users WHERE id = ?`,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        res.json({ id: req.params.id });
      }
    }
  )
})


export default router;