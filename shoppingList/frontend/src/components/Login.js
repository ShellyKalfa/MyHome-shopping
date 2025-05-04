

import { Link } from 'react-router-dom';
import '../style/Login.css'



export default function Login() {


    return (  <div className="bordLogin top">
           
                  <h2> Log in to contiue </h2><h2>your shopping </h2>
       <div>
            <div className='top'>
                <h3> Email address </h3>
                <input/>
            </div>
            <div>
                <h3> Password </h3>
                <input/>
            </div>
            <div>
                    <h5> Forgot password? </h5>
            </div>
            <button> Log in </button>
            <div className='flexDiv'>
                    <h5> Don't have an account? </h5>
                    <Link to="/Signup" className='bolder Link'> sign up  </Link>
            </div>
       </div>
    </div>);
};