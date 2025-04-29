const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')


const app = express() // instance of the express application - backbone of application

app.use(express.static(path.join(__dirname, "public"))) // crucial for handling clients on css, js apps
app.use(cors()) // security
app.use(express.json()) // json data from http request

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users" // for example
})

app.post('/add_user', (req, res)=>{
    sql = "INSERT INTO user_details (`name`,`email`,`role`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.role
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected' + err})
        return res.json({success: "product added successfully"})   
    })
})


app.post("/edit_user/:id", (req, res)=>{
    const id = req.params.id
    const sql = "UPDATE user_details SET `name`= ?, `email`= ?, `role`= ? WHERE `id`= ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.role,
        id
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected' + err})
        return res.json({success: "product updated successfully"})   
    })
})



app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id
    const sql = "DELETE FROM user_details WHERE `id`= ?";
    const values = [id]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected' + err})
        return res.json({success: "product updated successfully"})   
    })
})


app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM user_details"
    db.query(sql, (err, result)=>{
        if(err) res.json({message :"server error"});
        return res.json(result);
    });
});

app.get("/get_user/:id", (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM user_details WHERE `id`= ?"; 
    db.query(sql, [id], (err, result)=>{
        if(err) res.json({message :"Server error"});
        return res.json(result);
    });
});

app.listen(port, ()=>{
    console.log('listening')
})