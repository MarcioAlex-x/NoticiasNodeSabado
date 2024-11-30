const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'noticias'
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        app.listen(3000)
    }
})
