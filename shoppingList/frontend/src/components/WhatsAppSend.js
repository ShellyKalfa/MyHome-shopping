import React, { useState } from "react";
import axios from "axios";
import JSConfetti from 'js-confetti'

import PhonePopup from "./PhonePopup";
import PhoneVerification from "./PhoneVerification";

const API_BASE = "http://localhost:5000/Whatsapp";

export default function WhatsAppSend({ items, user, setUser }) {
    const [showPopup, setShowPopup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [step, setStep] = useState(1); // 1 = enter phone, 2 = verify code
    const [tempMessage, setTempMessage] = useState([]);
    const jsConfetti = new JSConfetti()

    const sendVerificationCode = async (phone) => {
        try {
            const response = await axios.post(`${API_BASE}/sendMessageCode`, { number: phone });
            console.log("Code sent:", response.data);
            setStep(2);
        } catch (err) {
            console.error("Error sending code:", err);
            alert("Failed to send verification code.");
        }
    };

    const verifyCode = async (phone, code) => {
        try {
            const response = await axios.post(`${API_BASE}/verifyCode`, {
                number: phone,
                code,
                userId: user?.userId // Make sure you pass this
            });

            console.log("Verification success:", response.data);
            alert("Phone verified and saved!");
            setShowPopup(false);
            setUser({ ...user, phone: phone });
            handleSendMessage(phone, formatShoppingListMessage(items));
            setStep(1);
        } catch (err) {
            console.error("Verification failed:", err);
            alert("Invalid or expired verification code.");
        }
    };

    function formatShoppingListMessage(items) {
        const activeItems = items.filter(item => item.completed === 0);

        let total = 0;

        let message = "\u200F🛒 רשימת קניות:\n\n";

        activeItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `\u200F ${index + 1}. ${item.itemName} × ${item.quantity} – ₪${itemTotal.toFixed(2)}\n`;
        });

        message += `\nסה"כ: ₪${total.toFixed(2)}`;
        return message;
    }

    const handleSendMessage = async (phoneToUse, tempMessage) => {
        const message = tempMessage ? tempMessage : "Hello from my React App!";

        try {
            const response = await axios.post(`${API_BASE}/sendMessage`, {
                number: phoneToUse,
                message: message,
            });

            console.log("Message sent:", response.data);
            jsConfetti.addConfetti(
                {confettiRadius:7,}
            );
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };

    const handleClick = () => {
        if (!user?.phone) {
            setShowPopup(true);
        } else {
            handleSendMessage(user.phone, formatShoppingListMessage(items));
        }
    };

    const handlePopupSubmit = (phone) => {
        setPhoneNumber(phone);
        setTempMessage(items.filter((item) => !item.completed));
        sendVerificationCode(phone);
    };

    const handleCodeSubmit = (code) => {
        verifyCode(phoneNumber, code);
    };

    return (
        <div className="divButton">
            {console.log("user", user)
            }


            {showPopup && step === 1 && (
                <PhonePopup
                    className="PopUp"
                    onSubmit={handlePopupSubmit}
                    onCancel={() => setShowPopup(false)}
                />
            )}

            {showPopup && step === 2 && (
                <PhoneVerification
                    className="PopUp"
                    onSubmit={handleCodeSubmit}
                    onCancel={() => {
                        setShowPopup(false);
                        setStep(1);
                    }}
                />
            )}
            <button className="whatsapppButton" onClick={handleClick}> שלח רשימה לווטסאפ </button>
        </div>
    )
}
