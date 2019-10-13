const Status_r = require('express').Router();
const Stats = require('../../db/eqStatus')

Status_r.get('/', (req, res)=>{
    try {
        Stats.showAll('Status').then(Status =>res.json(Status));
    } catch (error) {
        console.log(error)
        res.send(error);   
    }
})

Status_r.get('/:id', (req, res)=>{
    if(req.params.id){
        Stats.showOne(req.params.id).then(lab=>res.json(lab));
    } else {
        res.send('Please provide a valid lab name')
    }
})

Status_r.post('/create', (req, res)=>{
    try {
        Stats.create({
            status_id       : req.body.status_id,
            user_id         : req.body.user_id,
            start_date      : req.body.start_date,
            end_date        : req.body.end_date,
            current_status  : req.body.current_status,
            equipment_id    : req.body.equipment_id,
            equipment_name  : req.body.equipment_name,
        }).then(labs => res.json(labs));
    } catch (error) {
        console.log(error)
        res.send(error);   
    }
})

Status_r.patch('/:lab_id', (req, res)=>{
    if(req.params.lab_id){
        var updatePayload = {
            lab_name:req.body.lab_name,
            lab_dept:req.body.lab_dept
        }
        Stats.update(req.params.lab_id,updatePayload).then(lab=> res.json(lab));

    }else {
    res.send('Please provide a valid lab id')
    }
})

Status_r.delete('/:lab_id', (req, res)=>{
    try {
        Stats.remove(req.params.lab_id).then(res.send(`successfully deleted id: ${req.params.lab_id}`));
    } catch (error) {
        console.log(error)
        //res.send(error);
    }
})

module.exports = Status_r;