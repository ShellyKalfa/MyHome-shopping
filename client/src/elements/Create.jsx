import axios from "axios"
import React, { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        product_name: '',
        weight: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        axios.post('/add_product', values)
        .then((res)=>{
            navigate("/")
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="container vh-100 vw-100 bg-primary">
            <div className="row">
                <h3>Add product</h3>
                <div className="d-flex justify-content-end">
                    <Link to='/' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="product_name">Name</label>
                        <input type="text" name="product_name" required onChange={(e)=> setValues({...values, product_name: e.target.value})} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="weight">Weight</label>
                        <input type="text" name="weight" required onChange={(e)=> setValues({...values, weight: e.target.value})} />
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