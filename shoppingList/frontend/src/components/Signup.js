import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import '../style/Signup.css'; // וודא שהקובץ הזה קיים עם ה-CSS ששלחתי קודם
// commponet of the Sign up to the web page 
export default function Signup({ setUser }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // התחלנו כ-false (מוסתר) ליתר ביטחון
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    // קבועים
    const PASSWORD_LENGTH = 8;
    // שיניתי מעט את ה-Regex כדי שיקבל גם סיומות אחרות חוץ מ-.com (כמו .co.il)
    const EMAIL_TEMPLATE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // check the template and unfiled inputs 
    const validateAndSubmit = (event) => {
        event.preventDefault();
        setError('');

        // 1. בדיקת שדות ריקים
        if (!fullName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // 2. בדיקת אימייל
        if (!EMAIL_TEMPLATE.test(email)) {
            setError('Invalid email address.');
            return;
        }

        // 3. בדיקת חוזק סיסמה (הלוגיקה המקורית שלך)
        if (
            password.length < PASSWORD_LENGTH || 
            !/[A-Z]/.test(password) || 
            !/[a-z]/.test(password) || 
            !/[^a-zA-Z0-9]/.test(password)
        ) {
            setError(
                `Password must contain:\n• At least ${PASSWORD_LENGTH} characters\n• One uppercase letter\n• One lowercase letter\n• One special character`
            );
            return;
        }

        // 4. שליחה לשרת
        axios.post('http://localhost:5000/users/signup', {
            email,
            name: fullName,
            password,
        })
        .then((res) => {
            if (res.data.success && res.data.user) {
                // יצירת אובייקט יוזר והתחברות
                const newUser = {
                    email,
                    password, // שים לב: בדרך כלל לא שומרים סיסמה בקליינט בצורה גלויה, אבל שמרתי על הלוגיקה שלך
                    userId: res.data.user,
                    userName: fullName,
                };
                setUser(newUser);
                navigate('/CreateFamily');
            }
        })
        .catch((err) => {
            const msg = err.response?.data?.message || 'Signup failed. Please try again.';
            setError(msg);
        });
    };

    const handleGoogleSuccess = (credentialResponse) => {
        // פענוח הטוקן כדי להוציא את השם והאימייל
        const decoded = jwtDecode(credentialResponse.credential);
        
        axios.post('http://localhost:5000/users/google-login', {
            email: decoded.email,
            name: decoded.name,
            token: credentialResponse.credential // שליחת הטוקן המקורי לשרת לאימות
        })
        .then(res => {
            if (res.data.success && res.data.user) {
                setUser(res.data.user);
                navigate('/CreateFamily');
            } else {
                setError('Google login failed.');
            }
        })
        .catch(() => {
            setError('Server error. Please try again later.');
        });
    };

    return (
        <div className="signup-page-container">
            
            {/* צד שמאל - מיתוג ואווירה */}
            <div className="signup-hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Start Your<br/>Journey</h1>
                    <p className="hero-subtitle">
                        Join thousands of families managing<br/>
                        their shopping smartly. 🛒
                    </p>
                </div>
            </div>

            {/* צד ימין - הטופס */}
            <div className="signup-form-section">
                <div className="form-wrapper">
                    
                    <div className="form-header">
                        <h2>Sign Up</h2>
                        <p>Create your account to start shopping</p>
                    </div>

                    <form onSubmit={validateAndSubmit}>
                        
                        {/* שם מלא */}
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                className="custom-input"
                                type="text"
                                placeholder="Israel Israeli"
                                value={fullName}
                                onChange={(e) => { setFullName(e.target.value); setError(''); }}
                            />
                        </div>

                        {/* אימייל */}
                        <div className="form-group">
                            <label className="form-label">Email address</label>
                            <input
                                className="custom-input"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            />
                        </div>

                        {/* סיסמה */}
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-container">
                                <input
                                    className="custom-input"
                                    // שימוש בשיטה הסטנדרטית להסתרת סיסמה
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* הצגת שגיאות */}
                        {error && <div className="error-message" style={{whiteSpace: 'pre-line'}}>{error}</div>}

                        <button className="signup-btn" type="submit">Sign Up</button>
                    </form>

                    <div className="separator">
                        <div className="line"></div>
                        <span>OR</span>
                        <div className="line"></div>
                    </div>

                    {/* כפתור גוגל */}
                    <div className="google-btn-wrapper">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google signup failed.")}
                            shape="circle"
                            text="signup_with"
                            width="300"
                        />
                    </div>

                    <div className="login-redirect">
                        Already have an account? 
                        <Link to="/Login" className="login-link">Log in</Link>
                    </div>

                </div>
            </div>
    return (
        <div className="bordLogin top">
            <h2>Sign up to</h2>
            <h2>start shopping</h2>
            <form onSubmit={validateAndSubmit}>
                <div className="top">
                    <h3>Full Name</h3>
                    <input
                        className="LogInInput"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            setError('');
                        }}
                    />
                </div>
                <div>
                    <h3>Email address</h3>
                    <input
                        className="LogInInput"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                    />
                </div>
                <div>
                    <h3>Password</h3>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            className="LogInInput"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="hidePasswordBottom"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                {error && (<p style={{ color: 'red', whiteSpace: 'pre-line', fontSize: '1.2rem' }}>{error}</p>)}

                <button className="LogInbutton" type="submit">
                    Sign up
                </button>

                <div className="flexDiv">
                    <h3>Have an account? </h3>
                    <Link to="/Login" style={{ color: "Blue" }} className="bolder Link">
                        Log in
                    </Link>
                </div>
                <div className='separator'>
                    <div className="line"></div>
                    <span>or</span>
                    <div className="line"></div>
                </div>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        axios.post('http://localhost:5000/users/google-login', {
                            token: credentialResponse.credential
                        })
                            .then(res => {
                                if (res.data.success && res.data.user) {
                                    setUser(res.data.user);
                                    navigate('/CreateFamily');
                                } else {
                                    setError('Google login failed.');
                                }
                            })
                            .catch(() => {
                                setError('Server error. Please try again later.');
                            });
                    }}

                    onError={() => {
                        setError("Google login failed.");
                    }}
                />
            </form>
        </div>
    </div>
    );
}