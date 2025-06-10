import React, { useState } from 'react';

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
        <div style={{
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid #ccc',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1000
        }}>
            <h3>Enter Phone Number</h3>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
            />
            <br /><br />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onCancel} style={{ marginLeft: '10px' }}>
                Cancel
            </button>
        </div>
    );
}
