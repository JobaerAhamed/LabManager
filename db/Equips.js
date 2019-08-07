const mongoose = require('mongoose');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const ModelClass = require('./ModelFactory')

class Equips{
    constructor(equipment_id = '', equipment_name = '', equipment_quantity = ''){
        this.name               = "Equipments"
        this.Methods            = new ModelClass
        this.equipment_id       = equipment_id
        this.equipment_name     = equipment_name
        this.equipment_quantity = equipment_quantity
        this.defaultSchema      = {
            _id: {
                type: String,
                default: shortid.generate,
                index: true,
                unique: true,
            },
            equipment_id: {
                type: Number,
                required: true,
                index: true,
            },
            equipment_name: {
                type: String,
                required: true,
                index: true,
            },
            equipment_quantity: {
                type: String,
                required: true
            },
            date_created: {
              type: Date,
              default: Date.now
            }
        }
        this.schema     = this.Methods.makeSchema(this.defaultSchema)
        this.model      = this.Methods.makeModel(this.name, this.schema)
    }

    async create(payload={}){
        try {
            const newEquipment = new this.model(payload)
            const Equipment = await newEquipment.save();
            return Equipment
        } catch (error) {
            return error
        }
    }
    async showAll(){
        try {
            const Equipments = await this.model.find();
            return Equipments
        } catch (error) {
            return error
        }
    }

    async showOne(name=''){
        try {
            const equip = await this.model.findOne({equipment_name : name});
            return equip;
        } catch (error) {
            return error
        }
    }
}

module.exports = new Equips;
