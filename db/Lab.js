const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const ModelClass = require('./ModelFactory')

class Lab{
    constructor(lab_id = '', lab_name = '', lab_dept = ''){
        this.name = "Lab"
        this.Methods    = new ModelClass
        this.lab_id     = lab_id
        this.lab_name   = lab_name
        this.lab_dept   = lab_dept
        this.defaultSchema     = {
            _id: {
                type: String,
                default: shortid.generate,
                index: true,
                unique: true,
            },
            lab_id: {
                type: Number,
                required: true,
                index: true,
            },
            lab_name: {
                type: String,
                required: true,
                index: true,
            },
            lab_dept: {
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
            const newLab = new this.model(payload)
            const Lab = await newLab.save();
            return Lab
        } catch (error) {
            return error
        }
    }
    async showAll(){
        try {
            const Labs = await this.model.find();
            return Labs
        } catch (error) {
            return error
        }
    }

    async showOne(id=''){
        try {
            const lab = await this.model.findOne({lab_id : id});
            return lab;
        } catch (error) {
            return error
        }
    }
    async update(id='',updatePayload={}){
        try{
            const updateLab = await this.model.findOneAndUpdate({lab_id: id},updatePayload)
            return updateLab;
        }catch(error){
            console.log(error);
        }
    }
    async remove(id=''){
        try{
           const deleteLab = await this.model.findOneAndDelete({lab_id : id})
           return deleteLab;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new Lab;
