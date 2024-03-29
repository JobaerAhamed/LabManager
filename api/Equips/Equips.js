const Equipment = require('express').Router();
const Equipments = require('../../db/Equips')

Equipment.get('/', (req, res)=>{
    try {
        Equipments.showAll('Equipments').then(equipments =>res.json(equipments));
    } catch (error) {
        console.log(error)
        //res.send(error);   
    }
})
Equipment.get('/:equipment_id', (req, res)=>{
    if(req.params.equipment_id){
        Equipments.showOne(req.params.equipment_id).then(equipments=>res.json(equipments));
    } else {
        res.send('Please provide a valid lab name')
    }
})
Equipment.post('/create', (req, res)=>{
    try {
        Equipments.create({
            equipment_id            : req.body.equipment_id,
            equipment_name          : req.body.equipment_name,
            equipment_quantity      : req.body.equipment_quantity,
            equipment_extra_info    : req.body.equipment_extra_info,
            status_id       : req.body.current_status_id

        }).then(equipments => res.json(equipments));
    } catch (error) {
        console.log(error)
        //res.send(error);   
    }
}) 
Equipment.patch('/:equipment_id', (req, res)=>{
    if(req.params.equipment_id){
        var updatePayload = {
            equipment_name:req.body.equipment_name,
            equipment_quantity:req.body.equipment_quantity
        }
        Equipments
            .update(req.params.equipment_id,req.body)
            .then(equipments=> res.json(equipments));

    }else {
    res.send('Please provide a valid lab name')
    }
})

Equipment.delete('/:equipment_id', (req, res)=>{
    try {
        Equipments.remove(req.params.equipment_id).then(equipments=> res.json(equipments));
    } catch (error) {
        console.log(error)
        res.send(error);   
    }
}) 
module.exports = Equipment;