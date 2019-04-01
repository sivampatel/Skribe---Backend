let express = require('express');

let router  = express.Router();
let mongoose = require('mongoose');
let User = require('../models/user');
let bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/folders',{
  useNewUrlParser: true
});

router.use(bodyParser.json());


router.post('/createAccount',function(req,res){

    console.log(req.body);

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

        (req.body.password == user.password)
        .then(
            console.log('yay you logged in'),
            res.send(user._id)
            )
    }).catch(err => {
        res.send(err);
    })

})

module.exports = router