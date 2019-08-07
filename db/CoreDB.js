const monogoose = require('mongoose')
const Lab = require ('./Lab')

class Database {
    constructor(){
        this.models = [Lab]
        this.extra
        this.connection
        this.operations
    }
    async connect (){
        try {
            this.connection = await monogoose.connect('mongodb://mkshuvo:iamshuvo123@ds044907.mlab.com:44907/labmanager', { useNewUrlParser: true, useCreateIndex: true });
            console.log("Connected to mongo DB")
            return this
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}

const DB = new Database;
DB.connect()
module.exports = DB;



    // async create(name, payload){
    //     try {
    //         this.models.filter(async model=>{
    //             if (model.name == name){
    //                 return await model.create(payload)
    //             }
    //         })
    //     } catch (error) {
    //         return error
    //     }
    // }
    // setModel(name=''){
    //     this.slectedModel = this.models.filter(model=> model.name === name)[0]
    // }
    // async showAll(){
    //     try {
    //         console.log(this.slectedModel.name)
    //         return await this.slectedModel.showAll();
    //     } catch (error) {
    //         return error
    //     }
    // }