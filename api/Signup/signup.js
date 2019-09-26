const signup = require('express').Router();

signup.get('/', (req, res)=>{
    res.send('All good').end();
})

module.exports = signup;