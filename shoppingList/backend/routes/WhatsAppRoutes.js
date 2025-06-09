const express = require('express');
const router = express.Router();
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

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
    console.log('Received message:', msg.body);
});

client.initialize();

// Route to send WhatsApp message
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

module.exports = router;
