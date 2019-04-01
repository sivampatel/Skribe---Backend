let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');
let Folder = require('../models/folder');
let document = require('../models/document');
let user = require('../models/user');
let bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');
let Course = require('../models/course');



router.use(fileUploader());

router.use(bodyParser.urlencoded({
  extended : false
}));

router.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/folders',{
  useNewUrlParser: true
});




//params: userId
//does: returns json of all user courses
router.post('/getUserCourses', function(req,res){

  user.findOne({_id : req.body.id})
  .populate('courses','name')
  .exec(function(err,user){
    if(err) return handleError(err);
    res.send(user)
  })

})



//params: folder name, also needs to
//does: responds with all documents in given folder
router.post('/getAllDocuments',function(req,res){

  Folder.
  findOne({name : req.body.name})
  .populate('documents','name')
  .exec(function(err,folder){
      if(err) return handleError(err);
      res.send(folder.documents);
  })

})



//params: user _id, name of course
//creates a course under specified user
router.post('/addCourse', function(req, res){

  user.findOne({_id:req.body.id}).then(user => {

    let courseId = new mongoose.Types.ObjectId();

    let course = new Course({
      name : req.body.name,
      id : courseId
    })

    user.courses.push(courseId);
    user.save();
    course.save();

    res.send(course);

  })
})



//params: needs courseName, folder name
router.post('/addFolder',function(req,res){

    user.findOne({_id:req.body.id})

    .then( user => {

      let foldId = new mongoose.Types.ObjectId();

      let folder = new Folder({

      name : req.body.name,
      _id : foldId

      })

    user.folders.push(foldId);
    user.save();

    folder.save();
    res.send(folder);

    })  
})


// this needs something
router.get('/wordSearch', function(req,res){

  var phrase = req.body.search;
  

  console.log(req.body);


  document.find({content: new RegExp(phrase)}, function(err,docs){
    
    let names = new Array;

    docs.forEach( doc => {
      names.push(doc.name)
    })

    res.send(names);
    
  });
})






// this is fine, just needs to specify course also
router.post('/addDocument',function(req,res){

  

  Folder.findOne({name:req.body.folder})
  .then(fold => {
    
    let docId = new mongoose.Types.ObjectId();
    

    let doc = new document({

    _id : docId,
    name : req.body.name,
    content : req.body.content,
    folder : fold._id,
    image : req.files.image.data

  })


  fold.documents.push(docId);
  fold.save();

  doc.save();
  res.send(doc);
    
  })
  .catch( err =>{
    console.log(err)

  })
})

module.exports = router