import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Login.css'



export default function Signup({ setUser }) {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [displayPassword, setDisplayPassword] = useState('');
    const [, setTimers] = useState([]);
    const [, setIsVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const PASSWORD_LENGTH = 8;
    const EMAIL_TEMPLATE = /^[^\s@]+@[^\s@]+\.com$/;

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        const newChar = value[value.length - 1];

        setPassword(value);
        const masked = '•'.repeat(value.length - 1) + newChar;
        setDisplayPassword(masked);

        const timer = setTimeout(() => {
            setDisplayPassword('•'.repeat(value.length));
        }, 1500);
        setTimers((prev) => [...prev, timer]);
    };

    const validateAndSubmit = (event) => {
        event.preventDefault();
        setError('');

        // Empty field check
        if (!fullName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Email validation
        if (!EMAIL_TEMPLATE.test(email)) {
            setError('Invalid email address.');
            return;
        }

        // Password strength validation
        if (
            password.length < PASSWORD_LENGTH || !/[A-Z]/.test(password)
            || !/[a-z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)
        ) {
            setError(
                'Invalid Password. Must include:\n' + '• at least ' + PASSWORD_LENGTH + ' characters\n' +
                '• one uppercase letter\n' + '• one lowercase letter\n' + '• one special character');
            return;
        }

        // Send to backend
        axios
            .post('http://localhost:5000/users/signin', {
                email,
                name: fullName,
                password,
            })
            .then((res) => {
                if (res.data.success && res.data.user) {
                    const newUser = {
                        email,
                        password,
                        userId: res.data.user,
                        userName: fullName,
                    };
                    setUser(newUser);
                    navigate('/CreateFamily');
                }
            })
            .catch((err) => {
                if (err.response?.data?.success === false) {
                    setError(err.response.data.message || 'Signup failed.');
                } else {
                    setError('Unexpected error. Please try again later.');
                }
                setIsVisible(true);
            });
    };


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
                            setError('');}}
                    />
                </div>
                <div>
                    <h3>Email address</h3>
                    <input
                        className="LogInInput"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');}}
                    />
                </div>
                <div>
                    <h3>Password</h3>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            className="LogInInput"
                            type="text"
                            value={showPassword ? password : displayPassword}
                            onChange={handlePasswordChange}
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
                    <h3>Have an account?</h3>
                    <Link to="/Login" style={{color: "Blue"}} className="bolder Link">
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    );
}