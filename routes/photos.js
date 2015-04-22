var express = require('express');
var path    = require('path');
var fs      = require('fs');
var config  = require('../config');
var router  = express.Router();

router.post('/photo', function(req, res, next) {
  var photo = req.body.photo.replace(/^data:image\/png;base64,/, '');
  var photoPath = path.resolve((config.photoLib || __dirname), './photos', Date.now().toString() + '.png');

  console.log('saving into :' + photoPath);

  fs.writeFile(photoPath, photo, 'base64', function(err) {
    if (!err) {
      console.log('photo posted');
      res.send('ok');
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
