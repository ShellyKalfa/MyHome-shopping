import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function Edit() {
    const [data, setData] = useState([])
    const { barcode } = useParams();

    useEffect(()=>{
            axios
            .get(`/get_product/${barcode}`)
            .then((res)=>{
                setData(res.data)
            })  
            .catch((err)=>console.log(err))
    }, [barcode])
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()

        axios.post(`/edit_product/${barcode}`, data[0])
        .then((res)=>{
            navigate("/")
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>Product: {barcode}</h1>
            <Link to='/' className="btn btn-success">Back</Link>
            {data.map((product) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="product_name">Name</label>
                            <input value={product.product_name} type="text" name="product_name" required onChange={(e)=> setData([{ ...data[0], product_name: e.target.value}])} />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="weight">Weight</label>
                            <input value={product.weight} type="text" name="weight" required onChange={(e)=> setData([{ ...data[0], weight: e.target.value}])} />
                        </div>
                        <div className="form-group my-3">
                            <button type="submit" className='btn btn-success'>Save</button>
                        </div>
                    </form>
                );
            })}
        </div>
    );
}

export default Edit;