import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

function Read() {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=>{
            axios
            .get(`/get_user/${id}`)
            .then((res)=>{
                setData(res.data)
            })  
            .catch((err)=>console.log(err))
    }, [id])
    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>User: {id}</h1>
            <Link to='/' className="btn btn-success">Back</Link>
            {data.map((user) => {
                return (
                    <ul className="list-group">
                        <li className="list-group-item">
                            <b>ID: </b>
                            {user["id"]}
                        </li>
                        <li className="list-group-item">
                            <b>Name: </b>
                            {user["name"]}
                        </li>
                        <li className="list-group-item">
                            <b>Email: </b>
                            {user["email"]}
                        </li>
                        <li className="list-group-item">
                            <b>Role: </b>
                            {user["role"]}
                        </li>
                    </ul>
                )
            })}
        </div>
    );
}

export default Read;