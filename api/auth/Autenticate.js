const auth = (req, res, next) => {
    if (req.query.api_key === '123456'){
        next();
    }
    if (req.params.api_key === '123456'){
        next();
    }
    if (req.body.api_key === '123456'){
        next();
    }
    res.send('Authentication Failed');
}

module.exports = auth;