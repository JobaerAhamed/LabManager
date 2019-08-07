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
Equipment.get('/:equipment_name', (req, res)=>{
    if(req.params.equipment_name){
        Equipments.showOne(req.params.equipment_name).then(equipments=>res.json(equipments));
    } else {
        res.send('Please provide a valid lab name')
    }
})
Equipment.post('/create', (req, res)=>{
    try {
        Labs.create({
            equipment_id      : req.body.equipment_id,
            equipment_name    : req.body.equipment_name,
            equipment_quantity    : req.body.equipment_quantity
        }).then(equipments => res.json(equipments));
    } catch (error) {
        console.log(error)
        //res.send(error);   
    }
})  

module.exports = Equipment;