import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../style/Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const EMAIL_TEMPLATE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = (event) => {
        event.preventDefault();
        setError('');

        // Validation
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        if (!EMAIL_TEMPLATE.test(email)) {
            setError('Invalid email format.');
            return;
        }

        // Send login request
        axios.post('http://localhost:5000/users/login', { email, password })
            .then(res => {
                if (res.data.success && res.data.user) {
                    setUser(res.data.user);
                    navigate('/CreateFamily');
                } else {
                    setError('Invalid email or password.');
                    setIsVisible(true);
                }
            })
            .catch(err => {
                if (err.response?.data?.success === false) {
                    setError(err.response.data.message || 'Login failed.');
                } else {
                    setError('Unexpected error. Please try again later.');
                }
                setIsVisible(true);
            });
    };

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
                        onChange={(e) => { setEmail(e.target.value); setError('');}}
                    />
                </div>
                <div className="top">
                    <h3>Password</h3>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            className="LogInInput"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setError('');}}
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
                    <Link to="/Signup" style={{color: "Blue"}} className="bolder Link">Sign up</Link>
                </div>
                <div className='separator'>
                    <div className="line"></div>
                    <span>or</span>
                    <div className="line"></div>
                </div>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
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
                    }}
                    onError={() => {
                        setError("Google login failed.");
                    }}
                />
            </form>
        </div>
    );
}
