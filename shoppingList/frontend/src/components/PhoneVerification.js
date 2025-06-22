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
        <div className="PopUp">
            <h3> הכנס קוד אימות </h3>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={4}
            />
            <div>
            <button onClick={handleSubmit}> אימות </button>
            <button className='buttonSmall'  onClick={onCancel}> ביטול </button>
            </div>
        </div>
    );
}
