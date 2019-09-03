const express = require('express');
const bodyParser = require('body-parser');
const emoji = require('node-emoji');
const DB = require('./db/CoreDB');

const app = express();

const {auth, signup, lab, equips} = require('./api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, ()=> console.log('Running on 3000'));

app.use('/api/signup', logOriginalUrl, signup);
app.use('/api/labs', logOriginalUrl, lab);
app.use('/api/Equips', logOriginalUrl, equips);

function logOriginalUrl (req, res, next) {
    console.log(`${emoji.get('game_die')}    |    ${req.method}   |   ${req.headers.host}   |  ${req.originalUrl}   |   ${req.headers['user-agent']}`);
    next()
}