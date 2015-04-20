var express = require('express');
var router =  express.Router();
var path   =  require('path');
var fs     =  require('fs');
var config =  require('../config');
var filewalker = require('filewalker');



router.get('/photos', function(req, res){

  var photoDir = path.resolve(config.photoLib || __dirname);
  var photos = [];

  filewalker(photoDir)
    .on('dir', function(p) {
      console.log('dir:  %s', p);
    })
    .on('file', function(p, s) {
      var file = path.normalize(p);
      var ext = path.extname(file);
      if (ext === ".png" || ".jpg" || ".jpeg")
       photos.push(file);

      console.log('file: %s, %d bytes', p, s.size);
    })
    .on('error', function(err) {
      console.error(err);
      res.send(500, err);
    })
    .on('done', function() {
      console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
      console.log(JSON.stringify(photos));
      res.send(JSON.stringify(photos));
    })
  .walk();
});

router.post('/photo', function(req, res, next) {
  var photo = req.body.photo.replace(/^data:image\/png;base64,/, '');
  var photoPath = path.resolve((config.photoLib || __dirname), './photos', Date.now().toString() + '.png');

  console.log("saving into :" + photoPath);

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
