import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import '../style/Login.css';

// אפשר להוסיף אייקון אם תרצה
// import { FiShoppingBag } from "react-icons/fi"; 

// commponet of the log in to the web page 
export default function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const EMAIL_TEMPLATE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Log in with user email and password also check the template and unfiled inputs 
    const handleLogin = (event) => {
        event.preventDefault();
        setError('');
<<<<<<< HEAD
=======
        console.log("email, password", email, password);
>>>>>>> whatsapp1

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        if (!EMAIL_TEMPLATE.test(email)) {
            setError('Invalid email format.');
            return;
        }
<<<<<<< HEAD
        
=======


        // Send login request
>>>>>>> whatsapp1
        axios.post('http://localhost:5000/users/login', { email, password })
            .then(res => {
                if (res.data.success && res.data.user) {
                    setUser(res.data.user);
                    navigate('/CreateFamily');
                } else {
                    setError('Invalid email or password.');
                }
            })
            .catch(err => {
                const msg = err.response?.data?.message || 'Login failed. Please try again.';
                setError(msg);
            });
    };

<<<<<<< HEAD
    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        axios.post('http://localhost:5000/users/google-login', {
            email: decoded.email,
            name: decoded.name
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
=======
    return (
        <div className="bordLogin top">
            <h2>Log in to continue</h2>
            <h2>your shopping</h2>
            <form onSubmit={handleLogin}>
                <div className="top">
                    <h3>Email address</h3>
                    <input
                        className="LogInInput"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    />
                </div>
                <div className="top">
                    <h3>Password</h3>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            className="LogInInput"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="hidePasswordBottom"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                {error && (<p style={{ color: 'red', whiteSpace: 'pre-line', fontSize: '1.2rem' }}> {error} </p>)}
                <div className="top">
                    <h5>Forgot password?</h5>
                </div>
                <button className="LogInbutton" type="submit">Log in</button>
                <div className="flexDiv top">
                    <h3>Don't have an account?</h3>
                    <Link to="/Signup" style={{ color: "Blue" }} className="bolder Link">Sign up</Link>
                </div>
                <div className='separator'>
                    <div className="line"></div>
                    <span>or</span>
                    <div className="line"></div>
                </div>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse.credential);
>>>>>>> whatsapp1

    return (
        <div className="login-page-container">
            
            {/* צד שמאל - תמונה/מיתוג (מוצג רק בדסקטופ) */}
            <div className="login-hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">MyHome<br/><span style={{color: '#2D9C6C'}}>Shopping</span></h1>
                    <p className="hero-subtitle">
                        Manage your family shopping list easily. <br/>
                        Stop forgetting the milk! 🥛
                    </p>
                </div>
            </div>

            {/* צד ימין - הטופס */}
            <div className="login-form-section">
                <div className="form-wrapper">
                    
                    <div className="form-header">
                        <h2>Welcome Back</h2>
                        <p>Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        
                        {/* שדה אימייל */}
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

                        {/* שדה סיסמה */}
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-container">
                                <input
                                    className="custom-input"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
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

                        <div className="forgot-password">
                            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button className="submit-btn" type="submit">Sign in</button>
                    </form>

                    <div className="separator">
                        <div className="line"></div>
                        <span>OR</span>
                        <div className="line"></div>
                    </div>

                    <div className="google-btn-wrapper">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google login failed.")}
                            shape="circle" // עיצוב עגול יותר לכפתור גוגל
                            width="300"
                        />
                    </div>

                    <div className="signup-redirect">
                        Don't have an account? 
                        <Link to="/Signup" className="signup-link">Sign up</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}