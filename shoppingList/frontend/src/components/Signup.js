import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../style/Login.css'



export default function Signup({ setUser }) {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name ,setName]=useState('')
    const [dataUser ,setDataUser]=useState({ email: '', userName: '', password: '' })
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const  handleSignUp = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
        // return res.status(400).json({ success: false, message: "All fields are required" });
    }
        axios.post('http://localhost:5000/signin', { email, name ,password })
           .then(res => {
       console.log(res.data);
    if (res.data.success) {
        setDataUser({ email: email, userName: name, password: password });
        setEmail('')
        setPassword('')
        setName('')
        handleGetUser()
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
        // console.error('Error:', error);
    });
 }

  const  handleGetUser= () => {
    if(dataUser.email!=''&&dataUser.password !='')
    {
        axios.post('http://localhost:5000/login', 
            { email: dataUser.email, 
              password: dataUser.password  })
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
                    console.log(err)
                })
        } 
   }


    return (  <div className="bordLogin top">
           
                  <h2> Sign up to  </h2><h2>start shopping </h2>
       <div>
         <form onSubmit={handleSignUp}>
                <div className='top'>
                    <h3>  Full Name  </h3>
                    <input className='LogIninput' value={name} onChange={e =>setName(e.target.value)} />
                </div>
                <div>
                    <h3> Email address</h3>
                    <input className='LogIninput' value={email} onChange={e =>setEmail(e.target.value)} />
                </div>
                <div>
                    <h3> Password </h3>
                    <input className='LogIninput' value={password} onChange={e =>setPassword(e.target.value)} />
                </div>
                  <div className={isVisible ? 'Block' : 'none'}>
                        <h5 className='Invalid'> Invalid Email address or Password </h5>
                    </div>
                <button className='LogInbutton'> Sign up </button>
                <div className='flexDiv'>
                                        <h5> Have an account? </h5>
                                        <Link to="/Login" className='bolder Link'> Log in </Link>
                </div>
          </form>
       </div>
    </div>);
};