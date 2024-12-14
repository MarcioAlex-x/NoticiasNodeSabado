const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.use(express.urlencoded({ extends: true }))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    const sql = `SELECT * FROM noticias`
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const noticias = data
        console.log(noticias)
        res.render('home', { noticias })
    })
})

app.get('/create-post', (req, res) => {
    res.render('form-post')
})

app.get('/noticia/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM noticias WHERE id = ${id}`
    
    conn.query(sql, id,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const noticia = data[0]
        res.render('noticia', {noticia})
    })
})

app.get('/edit/noticia/:id',(req, res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM noticias WHERE id = ${id}`

    conn.query(sql, id,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const noticia = data[0]
        res.render('form-edit-post',{noticia})
    })
})

app.post('/add-post', (req, res) => {
    const titulo = req.body.titulo
    const subtitulo = req.body.subtitulo
    const artigo = req.body.artigo
    const data_publicacao = req.body.data_publicacao
    const autor = req.body.autor
    const fonte = req.body.fonte
    if (titulo && subtitulo && artigo && data_publicacao && autor && fonte) {
        const sql = `INSERT INTO noticias (titulo, subtitulo, artigo, data_publicacao, autor, fonte) VALUES ('${titulo}','${subtitulo}','${artigo}','${data_publicacao}','${autor}','${fonte}')`

        conn.query(sql, (err) => {
            console.log(err)
        })
        res.redirect('/')
    }else{
        console.log('/não foi possível enviar os dados')
        return
    }
    
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'noticia'
})

conn.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(3000, () => {
            console.log('http://localhost:3000')
        })
    }
})
