const shortid = require('shortid');
shortid.characters('$@0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
const ModelClass = require('./ModelFactory')
const bcrypt = require('bcrypt')

class User{
    constructor(user_id = '', user_name = ''){
        this.name = "User"
        this.Methods    = new ModelClass
        this.user_id     = user_id
        this.user_name   = user_name
        this.defaultSchema     = {
            _id: {
                type: String,
                default: shortid.generate,
            },
            user_id: {
                type: Number,
                required: true,
                index: true,
            },
            user_email: {
                type: String,
                required: true,
                index: true,
            },
            user_pass: {
                type: String,
                required: true,
                index: true,
            },
            user_name: {
                type: String,
                required: true,
                index: true,
            },
            user_dept: {
                type: String,
                required: true
            },
            user_role: {
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
            payload.user_pass = await bcrypt.hash(payload.user_pass, 10);
            const newUser = new this.model(payload)
            const User = await newUser.save();
            return User
        } catch (error) {
            return error
        }
    }
    async showAll(){
        try {
            const User = await this.model.find();
            return User
        } catch (error) {
            return error
        }
    }
    async showOne(id=''){
        try {
            const User = await this.model.findOne({user_id : id});
            return User;
        } catch (error) {
            return error
        }
    }
    async update(id='',updatePayload={}){
        try{
            const User = await this.model.findOneAndUpdate({user_id: id},updatePayload)
            return User;
        }catch(error){
            console.log(error);
        }
    }
    async remove(id=''){
        try{
           const User = await this.model.findOneAndDelete({user_id : id})
           return User;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new User;
