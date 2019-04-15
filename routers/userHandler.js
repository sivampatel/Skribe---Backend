let express = require('express');
const fileUploader = require('express-fileupload');
let router  = express.Router();
let mongoose = require('mongoose');
let User = require('../models/user');
let bodyParser = require('body-parser');

router.use(fileUploader());



router.use(bodyParser.urlencoded({
    extended : false
  }));
  
router.use(bodyParser.json());


router.post('/createAccount',function(req,res){

    let user = new User({

        _id: new mongoose.Types.ObjectId(),
        username : req.body.name,
        password : req.body.password

    })


    user.save();
    res.send(user);

})



router.post('/login',function(req,res){

    User.findOne({username : req.body.username}).then(user => {

        if(req.body.password == user.password)
        {   
            console.log('yay you logged in'),
            res.send(user._id)
        }
    })
})

module.exports = router