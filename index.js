const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
app.use(session({
    secret: 'BokuMango',
    resave: true,
    saveUninitialized: true
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))
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
    res.render('home')
})
app.get('/boku-home', (req, res) => {
    res.render('home2')
})
app.get('/login', (req, res) => {
    res.render('login', {session: req.session})
})
app.post('/login', (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    if(email && password){
        query = `SELECT * FROM users WHERE email = '${email}'`
        connection.query(query, (err, data) => {
            if(data.length > 0){
                for(var count = 0; count < data.length; count++){
                    if(data[count].password == password){
                        req.session.id = data[count].id;
                        res.redirect('/boku-home')
                    }else{
                        res.send('incorect password')
                    }
                }
            }else{
                res.send('wrong pass/email')
            }
        })
    }else{
        res.send('input email password')
        res.end()
    }
})
app.get('/logout', (req, res, next) => {
    res.session.destroy()
    res.redirect('/')
})
app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(4000, () => {
    console.log("app running well...")
})