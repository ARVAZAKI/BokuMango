const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/boku-home', (req, res) => {
    res.render('home2')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(4000, () => {
    console.log("app running well...")
})