const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new mongoose.Schema({

    _id: Schema.Types.ObjectId,
    name: String,
    content : String,
    folder : {type :Schema.Types.ObjectId , ref : 'folder'},
    image: Buffer


})

module.exports = mongoose.model('document',documentSchema);