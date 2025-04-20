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
    database: "products" // for example
})

app.post('/add_product', (req, res)=>{
    sql = "INSERT INTO product_details (`product_name`,`weight`) VALUES (?, ?)";
    const values = [
        req.body.product_name,
        req.body.weight
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected' + err})
        return res.json({success: "product added successfully"})   
    })
})


app.post("/edit_product/:id", (req, res)=>{
    const barcode = req.params.id
    const sql = "UPDATE product_details SET `product_name`= ?, `weight`= ? WHERE `barcode`= ?";
    const values = [
        req.body.product_name,
        req.body.weight,
        barcode
    ]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected' + err})
        return res.json({success: "product updated successfully"})   
    })
})



app.delete("/delete/:id", (req, res)=>{
    const barcode = req.params.id
    const sql = "DELETE FROM product_details WHERE `barcode`= ?";
    const values = [barcode]
    db.query(sql, values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected' + err})
        return res.json({success: "product updated successfully"})   
    })
})


app.get('/products', (req, res)=>{
    const sql = "SELECT * FROM product_details"
    db.query(sql, (err, result)=>{
        if(err) res.json({message :"server error"});
        return res.json(result);
    });
});

app.get("/get_product/:id", (req, res)=>{
    const barcode = req.params.id;
    const sql = "SELECT * FROM product_details WHERE `barcode`= ?"; 
    db.query(sql, [barcode], (err, result)=>{
        if(err) res.json({message :"Server error"});
        return res.json(result);
    });
});

app.listen(port, ()=>{
    console.log('listening')
})