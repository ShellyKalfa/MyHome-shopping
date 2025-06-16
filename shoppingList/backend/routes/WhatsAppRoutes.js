const express = require('express');
const router = express.Router();
const qrcode = require('qrcode-terminal');
const db = require('../db');
const { Client, LocalAuth } = require('whatsapp-web.js');

// In-memory store for verification codes
const requestDict = {};  // Format: { 'number': { code: 1234, timestamp: Date.now() } }
const CODE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

// WhatsApp client setup
const client = new Client({
    authStrategy: new LocalAuth()
});

let isClientReady = false;

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
    isClientReady = true;
});

client.on('message', msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

// Route to send message
router.post('/sendMessage', async (req, res) => {
    const { number, message } = req.body;

    if (!isClientReady) {
        return res.status(503).json({ error: 'WhatsApp client not ready' });
    }

    if (!number || !message) {
        return res.status(400).json({ error: 'Missing number or message in body' });
    }

    const chatId = number + '@c.us';

    try {
        const response = await client.sendMessage(chatId, message);
        res.json({ success: true, messageId: response.id._serialized });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Route to generate and send verification code
router.post('/sendMessageCode', async (req, res) => {
    const { number } = req.body;

    if (!isClientReady) {
        return res.status(503).json({ error: 'WhatsApp client not ready' });
    }

    if (!number) {
        return res.status(400).json({ error: 'Missing number in body' });
    }

    const code = Math.floor(1000 + Math.random() * 9000);
    requestDict[number] = { code, timestamp: Date.now() };

    const chatId = number + '@c.us';

    try {
        const response = await client.sendMessage(chatId, `Your verification code is: ${code}`);
        res.json({ success: true, messageId: response.id._serialized });
    } catch (err) {
        console.error('Error sending code:', err);
        res.status(500).json({ error: 'Failed to send verification code' });
    }
});

// Route to verify code
router.post('/verifyCode', async (req, res) => {
    const { number, code, userId } = req.body;

    if (!number || !code || !userId) {
        return res.status(400).json({ error: 'Missing number, code, or userId' });
    }

    const record = requestDict[number];
    if (!record) {
        return res.status(404).json({ error: 'Code not found for this number' });
    }

    const isExpired = (Date.now() - record.timestamp) > CODE_EXPIRY_TIME;

    if (isExpired) {
        delete requestDict[number];
        return res.status(410).json({ error: 'Code expired' });
    }

    if (String(record.code) !== String(code)) {
        return res.status(401).json({ error: 'Invalid code' });
    }

    // ✅ Save phone number to user's record
    const sql = "UPDATE users SET phone = ? WHERE userId = ?";
    db.query(sql, [number, userId], (err, result) => {
        if (err) {
            console.error("Failed to update phone number:", err);
            return res.status(500).json({ error: 'Failed to save phone number' });
        }

        delete requestDict[number]; // Remove code after successful verification
        return res.json({ success: true, message: 'Phone verified and saved' });
    });
});

module.exports = router;
