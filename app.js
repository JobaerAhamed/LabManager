const express = require('express');
const bodyParser = require('body-parser');
const emoji = require('node-emoji');
const rp = require('request-promise');

const app = express();

const { auth, signup, lab, equips, Status, User } = require('./api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on : ${port}`));

function logOriginalUrl(req, res, next) {
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

    res.render('index', { res });
})

app.post('/signup', (req, res) => {

    var options = {
        method: 'POST',
        uri: `http://${req.headers.host}/api/user/create`,
        body: req.body,
        json: true
    };
    rp(options)
        .then(function (result) {
            if (result) {
                res.redirect('/home')
            } else {
                console.log('Signup Failed')
                res.redirect('/?error=signup_failed')
            }
        })
        .catch(function (err) {
            // this is gotta be some validation error here. :p sorry XD
            console.log(err);
            res.redirect('/?error=signup_failed')
        });
})

app.post('/login', (req, res) => {
    var options = {
        method: 'POST',
        uri: `http://${req.headers.host}/api/user/login`,
        body: req.body,
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(function (result) {
            if (result) {
                /**
                 * This is where we will create our session
                 */
                res.redirect('/home')
            } else {
                console.log('Log in Failed')
                res.redirect('/?error=login_failed')
            }
        })
        .catch(function (err) {
            console.log(err);
            res.redirect('/?error=login_failed')
        });
})