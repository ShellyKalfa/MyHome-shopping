

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css'



export default function Login({ setUser }) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const  handleLogIn = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/users/login', { email, password })
             .then(res => {
                console.log(res.data)
            if(res.data.success){
                console.log(res.data.user)
               setUser (res.data.user)
               navigate('/CreateFamily');
            }
            else{
             setIsVisible(true);
            }
            })
             .catch(err => { 
                if (err.response && err.response.data && err.response.data.success === false) {
                    console.log("Server responded with an error:", err.response.data.message);
                    setIsVisible(true);
                } else {
                    // Fallback error
                    console.log("Unexpected error:", err.message);
                    setIsVisible(true);
                }
                });
    }


    return (  <div className="bordLogin top">
           
                  <h2> Log in to contiue </h2><h2>your shopping </h2>
       <div>
         <form onSubmit={handleLogIn}>
                <div className='top'>
                    <h3> Email address </h3>
                    <input className='LogIninput' onChange={e =>setEmail(e.target.value)}/>
                </div>
                <div>
                    <h3> Password </h3>
                    <input className='LogIninput' onChange={e =>setPassword(e.target.value)}/>
                </div>
                <div>
                    <div className={isVisible ? 'Block' : 'none'}>
                        <h5 className='Invalid'> Invalid Email address or Password </h5>
                    </div>
                        <h5> Forgot password? </h5>
                </div>
                <button className='LogInbutton'  type="submit" > Log in </button>
                <div className='flexDiv'>
                        <h5> Don't have an account? </h5>
                        <Link to="/Signup" className='bolder Link'> Sign up  </Link>
                </div>
        </form>
       </div>
    </div>);
};