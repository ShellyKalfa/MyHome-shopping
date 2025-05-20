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


//--------------------------------- ADDED BY IDO -----------------------------------

// gat items
router.get('/item/:listId', (req, res) => {
    const listId = req.params.listId;
    const sql = `SELECT * FROM item WHERE listId  = ?`
    db.query(sql, [listId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Delete a item by itemId
router.delete('/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  db.query('DELETE FROM item WHERE itemId = ?', [itemId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'item deleted!' });
  });
});

// Add a new fruit with quantity
router.post('/item', (req, res) => {
  const { itemName, quantity = 1, price = 0 } = req.body; // default quantity to 1 if not provided
  if (!itemName) return res.status(400).json({ error: 'Fruit itemName is required' });
  console.log("IDO");


  // Check for duplicates (case insensitive)
  db.query(
    'SELECT * FROM item WHERE LOWER(itemName) = LOWER(?)',
    [itemName],
    (err, results) => {
      if (err) {console.log(err);
      return res.status(500).json({ error: err });}
      if (results.length > 0) {
        return res.status(400).json({ error: 'Fruit already exists' });
      }

      // No duplicates found, insert new fruit
      db.query(
        'INSERT INTO item (itemName, quantity, price, listId) VALUES (?, ?, ?, 1)',
        [itemName, quantity, price],
        (err, result) => {
          if (err) {console.log(err);return res.status(500).json({ error: err });}
          res.json({ message: 'Fruit added!', itemId: result.insertItemId });
        }
      );
    }
  );
});

router.post('/search', async (req, res) => {
  try {

    console.log("req.body",req.body);
    
    const response = await axios.post('https://www.rami-levy.co.il/api/catalog?', req.body, {
      headers: {
        'Content-Type': 'routerlication/json'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update fruit completed status by itemId
router.patch('/item/:itemId', (req, res) => {  
  const { itemId } = req.params;
  const { completed } = req.body;

  // Update the completed status for the fruit with the given itemId
  db.query('UPDATE item SET completed = ? WHERE itemId = ?', [completed, itemId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Fruit not found' });
    res.json({ message: 'Fruit updated successfully!' });
  });
});

// Receive number selection from dropdown
router.patch('/item/:itemId/quantity', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  db.query('UPDATE item SET quantity = ? WHERE itemId = ?', [quantity, itemId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Fruit not found' });
    res.json({ message: 'Quantity updated' });
  });
});


//--------------------------------- ADDED BY IDO FINISHED-----------------------------------


module.exports = router;