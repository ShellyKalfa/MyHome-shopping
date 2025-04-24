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
        axios.get('/products')
        .then((res)=>{
            setData(res.data)
        })  
        .catch((err)=>console.log(err))
    }, [deleted])

    function handleDelete(barcode) {
        axios.delete(`delete/${barcode}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }
    return (
        <div className='container-fluid bg-primary vh-100 vw-100'>
            <h3>Products</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/add_product'>Add Product</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Barcode</th>
                        <th>Product Name</th>
                        <th>Weight</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((product)=>{
                            return (<tr>
                                <td>{product.barcode}</td>
                                <td>{product.product_name}</td>
                                <td>{product.weight}</td>
                                <td>
                                    <Link className='btn btn-success' to={`/get_product/${product.barcode}`}>Read</Link>
                                    <Link className='btn btn-success' to={`/edit_product/${product.barcode}`}>Edit</Link>
                                    <button onClick={()=>handleDelete(product.barcode)} className='btn btn-danger'>Delete</button>
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