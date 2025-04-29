import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function Edit() {
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
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()

        axios.post(`/edit_user/${id}`, data[0])
        .then((res)=>{
            navigate("/")
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>User: {id}</h1>
            <Link to='/' className="btn btn-success">Back</Link>
            {data.map((user) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="name">Name</label>
                            <input value={user.name} type="text" name="name" required onChange={(e)=> setData([{ ...data[0], name: e.target.value}])} />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="email">Email</label>
                            <input value={user.email} type="text" name="email" required onChange={(e)=> setData([{ ...data[0], email: e.target.value}])} />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="role">Weight</label>
                            <input value={user.role} type="text" name="role" required onChange={(e)=> setData([{ ...data[0], role: e.target.value}])} />
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