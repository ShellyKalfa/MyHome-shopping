const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');




router.post('/shoppingFamily/:familyId', (req, res) => {
  const familyId = req.params.familyId;
  const sql = `
    SELECT sl.listName,sl.listId 
    FROM shoppingList sl 
    JOIN family f ON sl.familyId = f.familyId 
    WHERE f.familyId= ?`;

  db.query(sql, [familyId], (err, data) => {
    if (err) {
      console.error("Login Failed:", err);
      return res.status(500).json("Login Failed");
    }

    if (data.length >= 0) {
      console.log(`✅ Login successful for member ID: ${familyId}`, data[0]);
      if (data.length > 0) {
        return res.json({ success: true, data : data });
      }
      else {
        return res.json({ success: true, data: null });
      }
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Login route
router.post('/login', (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Login Failed:", err);
      return res.status(500).json("Login Failed");
    }

    if (data.length > 0) {
      console.log("✅ Login successful", data[0]);
      return res.json({ success: true, user: data[0] });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});


module.exports = router;