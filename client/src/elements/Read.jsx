import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function Read() {
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
    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>Product: {barcode}</h1>
            <Link to='/' className="btn btn-success">Back</Link>
            {data.map((product) => {
                return (
                    <ul className="list-group">
                        <li className="list-group-item">
                            <b>Barcode: </b>
                            {product["barcode"]}
                        </li>
                        <li className="list-group-item">
                            <b>Product Name: </b>
                            {product["product_name"]}
                        </li>
                        <li className="list-group-item">
                            <b>Weight: </b>
                            {product["weight"]}
                        </li>
                    </ul>
                )
            })}
        </div>
    );
}

export default Read;