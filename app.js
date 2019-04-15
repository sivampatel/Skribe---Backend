
'use strict';

// [START gae_node_request_example]
const express = require('express');
const app = express();
const fileManager = require('./routers/fileManage');
const processImage = require('./routers/processImage');
const userHandler = require('./routers/userHandler');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/folders';

mongoose.connect(uri,{
  useNewUrlParser: true
});


app.use('/user',userHandler);
app.use('/fileManage',fileManager);
app.use('/processImage',processImage);



// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]
