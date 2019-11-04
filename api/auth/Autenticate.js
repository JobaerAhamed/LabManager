const auth = (req, res, next) => {
    console.log(req)
    if(!req.isAuthenticated()){
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = auth;