const Lab = require('express').Router();
const Labs = require('../../db/Lab')

Lab.get('/', (req, res)=>{
    try {
        Labs.showAll('Lab').then(labs =>res.json(labs));
    } catch (error) {
        console.log(error)
        //res.send(error);   
    }
})
Lab.get('/:lab_name', (req, res)=>{
    if(req.params.lab_name){
        Labs.showOne(req.params.lab_name).then(lab=>res.json(lab));
    } else {
        res.send('Please provide a valid lab name')
    }
})
Lab.post('/create', (req, res)=>{
    try {
        Labs.create({
            lab_id      : req.body.lab_id,
            lab_name    : req.body.lab_name,
            lab_dept    : req.body.lab_dept
        }).then(labs => res.json(labs));
    } catch (error) {
        console.log(error)
        //res.send(error);   
    }
})

Lab.patch('/:lab_id', (req, res)=>{
    if(req.params.lab_id){
        var updatePayload = {
            lab_name:req.body.lab_name,
            lab_dept:req.body.lab_dept
        }
        Labs.update(req.params.lab_id,updatePayload).then(lab=> res.json(lab));

    }else {
    res.send('Please provide a valid lab id')
    }
})

Lab.delete('/:lab_id', (req, res)=>{
    try {
        Equipments.remove(req.params.lab_id).then(lab=> res.json(lab));
    } catch (error) {
        console.log(error)
        //res.send(error);
    }
})

module.exports = Lab;