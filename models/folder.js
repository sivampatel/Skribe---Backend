const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const folderSchema = new mongoose.Schema({

    hId: Number,
    _id: Schema.Types.ObjectId,
    folderName: String,
    documents : [{type :Schema.Types.ObjectId , ref : 'document'}],
    


})

module.exports = mongoose.model('folder',folderSchema);