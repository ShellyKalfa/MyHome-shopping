const express = require('express');
const router = express.Router();
const db = require('../db');
const axios = require('axios');


router.post('/UserFamily/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT f.familyId, f.familyName 
    FROM memberFamily mf 
    JOIN family f ON mf.familyId = f.familyId 
    WHERE mf.userId = ?`;

  const values = [userId];
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Login Failed:", err);
      return res.status(500).json("Login Failed");
    }

    if (data.length >= 0) {
      console.log(`✅ Login successful for member ID: ${userId}`, data[0]);
      if (data.length > 0) {
        return res.json({ success: true, familyName: data });
      }
      else {
        return res.json({ success: true, familyName: null });
      }
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

router.post('/familyMembers', (req, res) => {
  const { familyId } = req.body;
  const sql = `
    SELECT  u.userName,mf.role
    FROM memberFamily mf 
    JOIN family f ON mf.familyId = f.familyId 
    JOIN users u ON mf.userId = u.userId
    WHERE f.familyId = ?`;

  db.query(sql, [familyId], (err, data) => {
    if (err) {
      console.error("Login Failed:", err);
      return res.status(500).json("Login Failed");
    }

    if (data.length >= 0) {
      if (data.length > 0) {
        return res.json({ success: true, data: data });
      }
      else {
        return res.json({ success: true, data: null });
      }
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});


router.post('/search', async (req, res) => {
  try {
    const response = await axios.post('https://www.rami-levy.co.il/api/catalog?', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/delteFamily/:familyId', (req, res) => {

  const { familyId } = req.params;
  const sql = 'DELETE FROM family WHERE familyId = ?';

  db.query(sql, [familyId], (err, data) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Failed to delete family' });
    }
    res.status(200).json({ success: true, message: 'Family deleted successfully' });

  })
});

router.post('/creatFamily/:id', (req, res) => {
  const userId = req.params.id;
  const { nameFamily, role } = req.body;

  const insertFamilySql = "INSERT INTO family (familyName) VALUES (?)";
  const insertFamilyValues = [nameFamily];

  db.query(insertFamilySql, insertFamilyValues, (err, result) => {
    if (err) {
      console.error("Family Insert Failed:", err);
      return res.status(500).json({ success: false, message: "Family insert failed" });
    }

    const familyId = result.insertId;

    const insertMemberFamilySql = "INSERT INTO memberFamily (userId, familyId, role) VALUES (?, ?, ?)";
    const insertMemberFamilyValues = [userId, familyId, role || 'manager']; // default role

    db.query(insertMemberFamilySql, insertMemberFamilyValues, (err2) => {
      if (err2) {
        console.error("Member Insert Failed:", err2);
        return res.status(500).json({ success: false, message: "Member insert failed" });
      }

      return res.json({
        success: true,
        message: "Family and member created successfully",
        familyId,
        familyName: nameFamily,
        userId,
        role: role || 'manager'
      });
    });
  });
});



router.post('/addFamilyMembers', (req, res) => {
  console.log("Request received to add family member");

  const { email, familyId, role = 'child' } = req.body;

  if (!email || !familyId) {
    return res.status(400).json({ success: false, message: "Email and familyId are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("User lookup failed:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (data.length === 0) {
      return res.status(201).json({ success: false, message: "User not found" });
    }

    const userId = data[0].userId;
    const userName = data[0].userName;

    const insertSql = "INSERT INTO memberFamily (userId, familyId, role) VALUES (?, ?, ?)";
    db.query(insertSql, [userId, familyId, role], (err2) => {
      if (err2) {
        console.error("Failed to insert member into family:", err2);
        return res.status(500).json({ success: false, message: "Insert failed" });
      }

      return res.status(201).json({ success: true, message: "Member added to family", userName, role });
    });
  });
});







  module.exports = router;