const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({


    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    user : {type:Schema.Types.ObjectId, ref : 'user'}, 
    folders: [{type : Schema.Types.ObjectId, ref : 'folder'}]

})

module.exports = mongoose.model('course',courseSchema);