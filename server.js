var express = require('express');
var path =require('path');
var bodyParser = require('body-parser');
var CONFIG = require('./config');
var db = require('./models');
var methodOverride = require('method-override');
var Pix = db.Pix;
var PORT = 5555;
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;//using basic authentication strategy 


var app = express();

app.set('view engine', 'jade');
app.set('views', 'views');

//tells express where all public files are located
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
//whatever is passed in here has to be used as the query paramater in jade
app.use(methodOverride('_method'));

passport.use(new BasicStrategy(
  function(username, password, done){
    //authentication strategy
    var user = authenticate;
    var isAuthenticated = authenticate(username, password);
    if(!(username == user.username && password === user.password)) {
      return done(null, false);
     }
     return done (null, user);
  }));

function authenticate(username, password) {
  var CREDENTIALS = CONFIG.CREDENTIALS;
  var USERNAME = CREDENTIALS.USERNAME;
  var PASSWORD = CREDENTIALS.PASSWORD;

  return username === USERNAME &&
         password === PASSWORD;
}

function isAuthenticated (req, res, next) {
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  return next();
}
//get localhost:3000
app.get('/', function (req, res) {
  Pix.findAll()
  .then(function (photos) {

      res.render('index', {photos: photos});
    });    
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/login', 
  passport.authenticate('basic', {
    successRedirect: '/gallery/new',
    failureRedirect: '/login'
  })
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//get localhost:3000/gallery/new
app.get('/gallery/new', 
  passport.authenticate('basic', {session: false}),
  function (req, res) {
  res.render('pic_form', {});
});

////get localhost:300/gallery/:id
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
app.get('/gallery/:id/edit', 
   isAuthenticated,
   function (req, res) {
   Pix.findById(req.params.id)
   .then(function (result){    
      var locals = {
        id:          result.id,
        author:      result.author,
        link:        result.link, 
        description: result.description
      };
      res.render('pic_form', locals);
    });

});

app.put('/gallery/:id', function (req, res) {
  Pix.update(
  {
    id: req.body.id,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description,
    updatedAt: new Date()
  },
  {
    where: {id: req.params.id}, 
    returning: true
  }
)
  .then(function (result){
   res.redirect('/gallery/' + req.params.id);
    
  });
});

app.delete('/gallery/:id', function (req, res) {
  Pix.destroy(
    {
      where:
        {id: parseInt(req.params.id)}
    } 
  )
  .then(function () {
    res.redirect('/');
  });
});


//renders page according to image id
app.post('/gallery/:id', function (req, res) {
  Pix.create(req.body)
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