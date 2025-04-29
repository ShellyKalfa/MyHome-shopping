import axios from "axios"
import React, { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        role: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        axios.post('/add_user', values)
        .then((res)=>{
            navigate("/")
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="container vh-100 vw-100 bg-primary">
            <div className="row">
                <h3>Add user</h3>
                <div className="d-flex justify-content-end">
                    <Link to='/' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" required onChange={(e)=> setValues({...values, name: e.target.value})} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" required onChange={(e)=> setValues({...values, email: e.target.value})} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="role">Role</label>
                        <input type="text" name="role" required onChange={(e)=> setValues({...values, role: e.target.value})} />
                    </div>
                    <div className="form-group my-3">
                    <button type="submit" className='btn btn-success'>Save</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Create