const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    realname: String,
    password : String, 

    //holds all of the objectIds of the courses the user has created
    courses: [{type:Schema.Types.ObjectId, ref : 'course'}]


})

module.exports = mongoose.model('user',userSchema);