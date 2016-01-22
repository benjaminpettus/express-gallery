var express = require('express');
var path =require('path');

var db = require('./models');
var Pix = db.Pix;
var PORT = 5555;


var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

var methodOverride = require('method-override');
//whatever is passed in here has to be used as the query paramater in jade
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
  Pix.findAll()
  .then(function (photos) {

      res.render('index', {photos: photos});
    });    
});

app.get('/gallery/:id', function (req, res) {
    console.log(req.params);
    Pix.findById(req.params.id)
    .then(function (result){
      var locals = {
        id:          result.id,
        author:      result.author,
        link:        result.link,
        description: result.description 
      };
      res.render('gallery', locals);
    });

});

app.get('/gallery/new', function (req, res) {

});

// sync then listen on port
db.sequelize
  .sync()
  .then(function (){
    app.listen(PORT, function() {
      console.log('listening on port ' + PORT);
  });

});