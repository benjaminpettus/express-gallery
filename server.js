var express = require('express');
var path =require('path');

var db = require('./models');
var PORT = 5555;


var app = express();

// app.use();

app.get('/', function (req, res) {
  Pix.findAll()
    .then(function (image){
      res.json(image);
    });
});

// sync then listen on port
db.sequelize
  .sync()
  .then(function (){
    app.listen(PORT, function() {
      console.log('listening on port ' + PORT);
  });

});