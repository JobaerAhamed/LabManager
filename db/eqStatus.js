const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const ModelClass = require('./ModelFactory');

class equip_status{
    constructor(equipment_id = '', equipment_name = '', equipment_quantity = ''){
        this.name               = "Status"
        this.Methods            = new ModelClass
        this.status_id          = equipment_id
        this.defaultSchema      = {
            _id: {
                type: String,
                default: shortid.generate,
                index: true,
                unique: true,
            },
            status_id: {
                type: Number,
                required: true,
                index: true,
            },
            user_id: {
                type: Number,
                required: true,
                index: true,
            },
            start_date: {
                type: Number,
                required: true
            },
            end_date: {
                type: Number,
                required: true
            },
            current_status: {
                type: String,
                required: true
            },
            equipment_id: {
              type: Number,
              required: true
            },
            equipment_name: {
                type: String,
                required: true
            }
        }
        this.schema     = this.Methods.makeSchema(this.defaultSchema)
        this.model      = this.Methods.makeModel(this.name, this.schema)
    }

    async create(payload={}){
        try {
            const newStatus = new this.model(payload)
            const Status = await newStatus.save();
            return Status
        } catch (error) {
            return error
        }
    }
    async showAll(){
        try {
            const Status = await this.model.find();
            return Status
        } catch (error) {
            return error
        }
    }
    async showOne(id=''){
        try {
            const Status = await this.model.findOne({status_id : id});
            return Status;
        } catch (error) {
            return error
        }
    }
    async update(id='',updatePayload={}){
        try{
            const updateStatus = await this.model.findOneAndUpdate({status_id: id},updatePayload)
            return updateStatus;
        }catch(error){
            console.log(error);
        }
    }
    async remove(id=''){
        return false;
        try{
           const deleteEquip = await this.model.findOneAndDelete({equipment_id : id})
           return deleteEquip;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new equip_status;
