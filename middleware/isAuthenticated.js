module.exports = function (req, res, next) {
    console.log('isAuthenticated',!req.isAuthenticated() );
    if(!req.isAuthenticated()){
      return res.redirect('/login');
   }
    return next();
  };

