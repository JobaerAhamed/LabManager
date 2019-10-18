const express = require('express');
const bodyParser = require('body-parser');
const emoji = require('node-emoji');

const app = express();

const {auth, signup, lab, equips, Status, User} = require('./api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

const port  = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`App started on : ${port}`));

function logOriginalUrl (req, res, next) {
    console.info(`${emoji.get('game_die')}    |    ${req.method}   |   ${req.headers.host}   |  ${req.originalUrl}   |   ${req.headers['user-agent']}`);
    next()
}

app.use(logOriginalUrl);
app.use('/api/signup', signup);
app.use('/api/labs', lab);
app.use('/api/equips', equips);
app.use('/api/status', Status);
app.use('/api/user', User);

app.get('/home', (req, res) => {
    res.render('index');
})