import React, { useState } from 'react';

export default function PhoneVerification() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = enter code
  const [message, setMessage] = useState('');

  const sendCode = async () => {
    if (!phone.trim()) {
      alert('Please enter a valid phone number.');
      return;
    }

    try {
      const res = await fetch('/sendMessageCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: phone }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2);
        setMessage('Verification code sent! Please check your WhatsApp.');
      } else {
        setMessage(data.error || 'Failed to send code');
      }
    } catch (err) {
      setMessage('Error sending code: ' + err.message);
    }
  };

  const verifyCode = async () => {
    if (!code.trim()) {
      alert('Please enter the verification code.');
      return;
    }

    try {
      const res = await fetch('/sendCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: phone, code }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage('Phone verified successfully!');
        setStep(1);
        setPhone('');
        setCode('');
      } else {
        setMessage(data.error || 'Verification failed');
      }
    } catch (err) {
      setMessage('Error verifying code: ' + err.message);
    }
  };

  return (
    <div className="PopUp" style={{ padding: 20, maxWidth: 300 }}>
      {step === 1 && (
        <>
          <h3>Enter Phone Number</h3>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            style={{ width: '100%', padding: '8px' }}
          />
          <br /><br />
          <button onClick={sendCode}>Send Code</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Enter Verification Code</h3>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification code"
            style={{ width: '100%', padding: '8px' }}
          />
          <br /><br />
          <button onClick={verifyCode}>Verify Code</button>
          <button
            onClick={() => {
              setStep(1);
              setCode('');
              setMessage('');
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        </>
      )}

      <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>
    </div>
  );
}
