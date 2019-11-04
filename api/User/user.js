const User_r = require('express').Router();
const User = require('../../db/user')

User_r.get('/', (req, res)=>{
    try {
        User.showAll('Users').then(User =>res.json(User));
    } catch (error) {
        console.log(error)
        res.send(error);   
    }
})

User_r.get('/:id', (req, res)=>{
    if(req.params.id){
        User.showOne(req.params.id).then(User=>res.json(User));
    } else {
        res.send('Please provide a valid user name')
    }
})

User_r.post('/create', (req, res)=>{
    try {
        User.create({
            user_id     : req.body.user_id,
            user_email  : req.body.user_email,
            user_pass   : req.body.user_pass,
            user_name   : req.body.user_name,
            user_dept   : req.body.user_dept,
            user_role   : req.body.user_role             
        }).then(User => res.json(User));
    } catch (error) {
        console.log(error)
        res.send(error);   
    }
})

User_r.patch('/:lab_id', (req, res)=>{
    if(req.params.lab_id){
        User.update(req.params.lab_id,req.body).then(User=> res.json(User));
    }else {
    res.send('Please provide a valid user id')
    }
})

User_r.delete('/:lab_id', (req, res)=>{
    try {
        User.remove(req.params.lab_id).then(res.send(`successfully deleted id: ${req.params.lab_id}`));
    } catch (error) {
        console.log(error)
        //res.send(error);
    }
})

User_r.post('/login', (req, res)=>{
    try {
        User.login(req.body).then(user => res.json(user));
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

module.exports = User_r;