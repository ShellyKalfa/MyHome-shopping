import React, { useState } from 'react';

import '../style/PhonePopup.css'

export default function PhonePopup({ onSubmit, onCancel }) {
    const [phone, setPhone] = useState('');

    const handleSubmit = () => {
        if (phone.trim()) {
            onSubmit(phone);
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    return (
        <div className='PopUp'>
            <h3>הכנס מספר טלפון</h3>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
            />
            <div>
                <button onClick={handleSubmit}>שלח קוד</button>
                <button className='buttonSmall' onClick={onCancel} >
                    ביטול
                </button>
            </div>
        </div>
    );
}
