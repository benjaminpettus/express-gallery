var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');

var db = require('../models');
var Photo = db.Photo;

router.route('/')
  .post(function (req, res) {
    Pix.create(req.body)
  })

