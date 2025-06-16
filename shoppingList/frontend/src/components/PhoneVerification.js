import React, { useState } from 'react';

export default function PhoneVerification({ onSubmit, onCancel }) {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        if (code.length !== 4) {
            alert('Enter a valid 4-digit code');
            return;
        }
        onSubmit(code);
    };

    return (
        <div>
            <h3>Enter Verification Code</h3>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={4}
            />
            <button onClick={handleSubmit}>Verify</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
