const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
    secret: 'BokuMango',
    cookie: {maxAge: 6000},
    resave: false,
    saveUninitialized: false
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))
app.use(flash())
//database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BokuMango'
})
connection.connect((err) => {
    if(err) throw err
    console.log('database connected')
})
//routing
app.get('/', (req, res) => {
    let pesan = req.flash('message')
    res.render('home', {pesan})
})
app.get('/validate', (req, res, next) => {
    let pesan = req.flash('message')
    if(req.id){
        next(res.render('home2'))
    }else{
        next(res.render('login', {pesan}))
    }
})
app.get('/boku-home', (req, res) => {
    let pesan = req.flash('message')
    res.render('home2', {pesan})
})
app.get('/login', (req, res) => {
    let pesan = req.flash('message')
    res.render('login', {pesan})
})
app.post('/auth', (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    if(email && password){
        query = `SELECT * FROM users WHERE email = '${email}'`
        connection.query(query, (err, data) => {
            if(data.length > 0){
                for(var count = 0; count < data.length; count++){
                    if(data[count].password == password){
                        req.session.id = data[count].id;
                        next(res.redirect('/boku-home'))
                    }else{
                        res.redirect('/login')
                    }
                }
            }else{
                req.flash('message','username atau password salah...')
                res.redirect('/login')
            }
        })
    }else{
        req.flash('message','please input email/password')
        res.end()
    }
})
app.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/auth-register', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    query = `INSERT INTO users (email, password) VALUES ('${email}','${password}')`
    connection.query(query,(err,data)=>{
        if(err) throw err
        res.redirect('/login')
    })
})
app.post('/contact-form1', (req, res)=>{
    let email = req.body.email
    let text = req.body.text
    query = `INSERT INTO contact (email, text) VALUES ('${email}','${text}')`
    connection.query(query,(err,data)=>{
        if(err) throw err
        req.flash('message', 'pesan berhasil terkirim..')
        res.redirect('/boku-home')
    })
})
app.post('/contact-form2', (req, res)=>{
    let email = req.body.email
    let text = req.body.text
    query = `INSERT INTO contact (email, text) VALUES ('${email}','${text}')`
    connection.query(query,(err,data)=>{
        if(err) throw err
        req.flash('message', 'pesan berhasil terkirim..')
        res.redirect('/')
    })
})
app.use('/',(req, res)=>{
    res.end('404 ga nemu')
})
app.listen(4000, () => {
    console.log("app running well...")
})