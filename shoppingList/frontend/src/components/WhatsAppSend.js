import React, { useState } from "react";
import axios from 'axios';

import PhonePopup from "./PhonePopup";
import PhoneVerification from "./PhoneVerification";

const API_BASE = 'http://localhost:5000/Whatsapp';

export default function WhatsAppSend(user,isTemp) {
    const [showPopup, setShowPopup] = useState(false);
    const [tempPhone, setTempPhone] = useState('');

    const handleSendMessage = async (phoneToUse) => {
        const message = 'Hello from my React App!';
        console.log("hhhhh");
        
        try {
            const response = await axios.post(`${API_BASE}/sendMessage`, {
                number: phoneToUse,
                message: message
            });

            console.log('Message sent:', response.data);
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        }
    };
    const handleClick = () => {
        // if(!isTemp || user){
        //     return;
        // }
        if (!user?.phone) {
            setShowPopup(true);
        } else {
            handleSendMessage(user.phone);
        }
    };

     const handlePopupSubmit = (phone) => {
        setShowPopup(false);
        handleSendMessage(phone);
    };

    return (
        <div>
            <button onClick={handleClick}>
                Send message to WhatsApp
            </button>
            {showPopup && (<>
                <PhonePopup
                    onSubmit={handlePopupSubmit}
                    onCancel={() => setShowPopup(false)}
                />
                {/* <PhoneVerification/> */}
                </>
            )}
        </div>
    );
}
