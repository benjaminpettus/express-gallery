var express = require('express');
var path =require('path');
var bodyParser = require('body-parser');
var db = require('./models');
var methodOverride = require('method-override');
var Pix = db.Pix;
var PORT = 5555;


var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));
//whatever is passed in here has to be used as the query paramater in jade
app.use(methodOverride('_method'));

app.get('/', function (req, res) {
  Pix.findAll()
  .then(function (photos) {

      res.render('index', {photos: photos});
    });    
});

app.get('/gallery/new', function (req, res) {
  res.render('pic_form', {});

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
app.get('/gallery/:id/edit', function (req, res) {
    console.log(req.params);
   Pix.findById(req.params.id)
   .then(function (result){
    var locals = {
      id: result.id,
      author: result.author,
      link: result.link, 
      description: result.description
    };
  res.render('edit', locals);
});

});

app.post('/gallery/:id', function (req, res) {
  Pix.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
    })
    .then(function (result){
    res.redirect('/gallery/' + result.id);
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