import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    const [data, setData] = useState([]) // always to get updated
    const [deleted, setDeleted] = useState(true)
    useEffect(()=>{
        if(deleted) {
            setDeleted(false)
        }
        axios.get('/users')
        .then((res)=>{
            setData(res.data)
        })  
        .catch((err)=>console.log(err))
    }, [deleted])

    function handleDelete(id) {
        axios.delete(`delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }
    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Users</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/add_user'>Add User</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user)=>{
                            return (<tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Link className='btn btn-success' to={`/get_user/${user.id}`}>Read</Link>
                                    <Link className='btn btn-success' to={`/edit_user/${user.id}`}>Edit</Link>
                                    <button onClick={()=>handleDelete(user.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home