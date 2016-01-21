var express = require('express');
var path =require('path');

var db = require('./models');
var PORT = 5555;


var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

app.get('/', function (req, res) {
  var data = {
    photos:[
    {author: 'Ben', link: 'http://lorempixel.com/300/300/transport', description: 'this is a picture of some type of transport'},
    {author: 'Kevin', link: 'http://lorempixel.com/300/300/sports', description: 'this is a picture of some type of sports'},
    {author: 'Chaz', link: 'http://lorempixel.com/300/300/nature', description: 'this is a picture of some type of nature'}
    ]};
  res.render('index', data);
});

// app.get('/gallery/:id', function (req, res) {


// });

// app.get('/gallery/new', function (req, res) {

// });

// sync then listen on port
db.sequelize
  .sync()
  .then(function (){
    app.listen(PORT, function() {
      console.log('listening on port ' + PORT);
  });

});