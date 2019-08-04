const mongoose = require('mongoose');

class Models {
    constructor(){
        this.schema
        this.model
        this.modelName
    }
    makeSchema (schema = {}){
        return this.schema = new mongoose.Schema(schema);
    }
    makeModel (name = '', model = {}){
        this.modelName = name;
        return this.model = mongoose.model(name, model);
    }
    getinfo (){
        return this
    }
}

module.exports = Models;