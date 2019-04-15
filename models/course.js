const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({


    _id: mongoose.Schema.Types.ObjectId,
    hId: Number,
    name : String,
    desc : String,
    color: String,
    folders: [{type : Schema.Types.ObjectId, ref : 'folder'}]

})

module.exports = mongoose.model('course',courseSchema);