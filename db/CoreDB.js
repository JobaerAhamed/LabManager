const monogoose = require('mongoose')
const Lab = require ('./Lab')

const DB_URI = process.env.MONGO_URI || 'mongodb://mkshuvo:iamshuvo123@ds044907.mlab.com:44907/labmanager';

class Database {
    constructor(){
        this.models = [Lab]
        this.extra
        this.connection = monogoose.connection
        this.operations
        this.options = { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false }
    }
    async connect (){
        try {
            monogoose.connect(DB_URI, this.options);
            console.log(`Connected to mongo DB : ${DB_URI}`)
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