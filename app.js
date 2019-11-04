const express = require('express');
const bodyParser = require('body-parser');
const emoji = require('node-emoji');
const rp = require('axios');
const app = express();
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session)
const {redis_client, getAsync, setAsync, keysAsync} = require('./redis')

const { auth, signup, lab, equips, Status, User } = require('./api');
const Users = require('./db/user')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*********************************************/
app.use(session({
    store: new RedisStore({ client: redis_client }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done)=>{
        Users.login({user_email: email, user_pass: password})
            .then(user=>{
                if (user) { return done(null, user) }
                else {return done(null, false)}
            })
            .catch(error =>{
                return done(error)
            })
    })
);
passport.serializeUser(function(user, done) {
    setAsync(user._id, JSON.stringify(user)).then(data=>done(null, user))
});
passport.deserializeUser(function(id, done) {
    getAsync(id._id).then(data=>{
        let user = JSON.parse(data)
        done(null, user)
    })
});

/*********************************************/

app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App started on : ${port}`));

function logOriginalUrl(req, res, next) {
    console.info(`${emoji.get('game_die')}    |    ${req.method}   |   ${req.headers.host}   |  ${req.originalUrl}   |   ${req.headers['user-agent']}`);
    next()
}
function internalCall(req, res, next) {
    rp.defaults.baseURL = `http://${req.headers.host}`;
    rp.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
    next()
}

app.use(logOriginalUrl);
app.use(internalCall);
app.use('/api/signup', signup);
app.use('/api/labs', lab);
app.use('/api/equips', equips);
app.use('/api/status', Status);
app.use('/api/user', User);


app.get('/home', auth, (req, res) => {
    res.render('index', { res });
})
app.post('/signup', (req, res) => {

    var options = {
        method: 'POST',
        url: '/api/user/create',
        data: req.body,
        // json: true
    };
    rp(options)
        .then(function (result) {
            if (result) {
                res.redirect('/login?signup=success')
            } else {
                console.log('Signup Failed')
                res.redirect('/?error=signup_failed')
            }
        })
        .catch(function (err) {
            // this is gotta be some validation error here. :p sorry XD
            console.log('Signup Failed', err);
            res.redirect('/?error=signup_failed')
        });
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/#login',
    })(req, res, next);
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})
app.get('/signup', (req, res, next)=>res.redirect('/#signup'))
app.get('/login', (req, res, next)=>res.redirect('/#login'))