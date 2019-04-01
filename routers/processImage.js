
let express = require('express');
let app = express();
let router = express.Router();
const vision = require('@google-cloud/vision')
const fileUploader = require('express-fileupload');
const client = new vision.ImageAnnotatorClient();
const jimp = require('jimp');




router.use(fileUploader());


router.post('/',function(req,res) {
  

    let imageFile = req.files.image.data;
    
    jimp.read(imageFile).then(grayImage => {
    
      imageFile = grayImage.grayscale();
    
    })
    
    let encoded = Buffer.from (imageFile).toString('base64');
    
    const request = {
    
      image: { content: encoded }
    
    };
    
    client.documentTextDetection(request).then(response => {
        res.send(response);
      })  
      
    });

module.exports = router
