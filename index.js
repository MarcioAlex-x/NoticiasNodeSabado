const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.use(express.urlencoded({extends:true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/create-post',(req, res)=>{
    res.render('form-post')
})

app.post('/add-post',(req, res)=>{
    const titulo = req.body.titulo
    const subtitulo = req.body.subtitulo
    const artigo = req.body.artigo
    const data_publicacao = req.body.data_publicacao
    const autor = req.body.autor
    const fonte = req.body.fonte

    const sql = `INSERT INTO noticias (titulo, subtitulo, artigo, data_publicacao, autor, fonte) VALUES ('${titulo}','${subtitulo}','${artigo}','${data_publicacao}','${autor}','${fonte}')`

    conn.query(sql,(err)=>{
        console.log(err)
    })

    res.redirect('/')
})

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'noticia'
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        app.listen(3000,()=>{
            console.log('http://localhost:3000')
        })
    }
})
