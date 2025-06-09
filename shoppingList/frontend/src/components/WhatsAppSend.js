import React from "react";
import axios from 'axios';

const API_BASE = 'http://localhost:5000/Whatsapp';

export default function WhatsAppSend() {
    const handleSendMessage = async () => {
        const phone = '972546706191';
        const message = 'Hello from my React App!';

        try {
            const response = await axios.post(`${API_BASE}/sendMessage`, {
                number: phone,
                message: message
            });

            console.log('Message sent:', response.data);
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        }
    };

    return (
        <div>
            <button onClick={handleSendMessage}>
                Send message to WhatsApp
            </button>
        </div>
    );
}
