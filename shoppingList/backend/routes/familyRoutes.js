const express = require('express');
const router = express.Router();
const db = require('../db');


const Roles = {
  MANAGER: "admin",
  CHILD: "user"
}


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
    SELECT  u.userName,mf.role ,mf.userId 
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

// Get all completed items (optionally by familyId) - added by omer for the "on hand" page
router.get('/completed-items/:familyId', (req, res) => {
  const familyId = req.params.familyId;

  const sql = `
    SELECT *
    FROM item i
           JOIN shoppingList sl ON i.listId = sl.listId
           JOIN family f ON sl.familyId = f.familyId
    WHERE  f.familyId = ? AND completed = 1
  `;

  db.query(sql, [familyId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching completed items:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    return res.json({ success: true, items: results });
  });
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
    const insertMemberFamilyValues = [userId, familyId, role || Roles.MANAGER]; // default role

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
        role: role || Roles.MANAGER
      });
    });
  });
});



router.post('/addFamilyMembers', (req, res) => {
  console.log("Request received to add family member");

  const { email, familyId, role = Roles.CHILD } = req.body;

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

      return res.status(201).json({ success: true, message: "Member added to family", userId, userName, role });
    });
  });
});


router.delete('/deleteFamilyMember/:familyId', (req, res) => {
  const { familyId } = req.params;
  const { userId } = req.body;

  const sql = "SELECT * FROM memberFamily WHERE familyId = ?";
  db.query(sql, [familyId], (err, data) => {
    if (err) {
      console.error("User lookup failed:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    const managerFamily = data.filter(member => member.userId != userId);

    if (!managerFamily.some(member => member.role === Roles.MANAGER)) {
      const deleteFamilySql = 'DELETE FROM family WHERE familyId = ?';
      db.query(deleteFamilySql, [familyId], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Failed to delete family' });
        }
        return res.status(200).json({ success: true, message: 'Family deleted successfully' });
      });
    } else {
      const deleteMemberSql = 'DELETE FROM memberFamily WHERE userId = ? AND familyId = ?';
      db.query(deleteMemberSql, [userId, familyId], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Failed to delete family member' });
        }
        return res.status(200).json({ success: true, message: 'Family member deleted successfully' });
      });
    }
  });
});

router.post('/updateFamilyMembers/:familyId', (req, res) => {
  console.log("Request received to add family member");
   const { familyId } = req.params;
  const { userId } = req.body;
  const updateSql = "UPDATE memberFamily SET role = ? WHERE userId = ? AND familyId = ?";
 console.log("noww",userId);

   db.query(updateSql, [Roles.MANAGER,userId, familyId], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Failed to update  family member' });
        }
        return res.status(200).json({ success: true, message: 'Family member update  successfully' });
      });
});

module.exports = router;