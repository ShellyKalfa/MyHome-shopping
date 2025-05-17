const MAX_FAMILY_MEMBERS = 5;

// connect to MySQL
const bcrypt = require('bcrypt');
const db = require('./db');

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // 1. Create user
    const [userResult] = await db.execute(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );

    const userId = userResult.insertId;

    // 2. Create new family
    const [familyResult] = await db.execute(
        'INSERT INTO families (name, created_by) VALUES (?, ?)',
        [`${username}'s Family`, userId]
    );

    const familyId = familyResult.insertId;

    // 3. Add user to family as admin
    await db.execute(
        'INSERT INTO family_members (user_id, family_id, role) VALUES (?, ?, ?)',
        [userId, familyId, 'admin']
    );

    res.status(201).json({ message: 'User registered and family created.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed.' });
  }
}

async function addUserToFamily(req, res) {
  const { userIdToAdd, familyId, requestingUserId } = req.body;

  try {
    // Check if requester is admin of that family
    const [adminCheck] = await db.execute(
        `SELECT * FROM family_members WHERE user_id = ? AND family_id = ? AND role = 'admin'`,
        [requestingUserId, familyId]
    );

    if (adminCheck.length === 0) return res.status(403).json({ message: 'Not authorized.' });

    // Check how many users in the family
    const [countCheck] = await db.execute(
        `SELECT COUNT(*) as count FROM family_members WHERE family_id = ?`,
        [familyId]
    );

    if (countCheck[0].count >= MAX_FAMILY_MEMBERS) return res.status(400).json({ message: 'Family is full.' });

    // Add the user
    await db.execute(
        `INSERT INTO family_members (user_id, family_id, role) VALUES (?, ?, ?)`,
        [userIdToAdd, familyId, 'member']
    );

    res.status(200).json({ message: 'User added to family.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add user to family.' });
  }
}
