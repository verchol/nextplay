var express    = require('express');
var photos     = require('./photos');
var config     = require('../config');
var path       = require('path');
var filewalker = require('filewalker');
var router     = express.Router();


/* GET home page. */
router.get('/trivia', photos);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin/photos', function(req, res) {
  var photoDir = path.resolve(config.photoLib || __dirname);
  var photos = [];

  filewalker(photoDir)
    .on('dir', function(p) {
      console.log('dir:  %s', p);
    })
    .on('file', function(p, s) {
      var file = path.normalize(p);
      var ext = path.extname(file);

      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        photos.push(file);
      }

      console.log('file: %s, %d bytes', p, s.size);
    })
    .on('error', function(err) {
      console.error(err);
      res.send(500, err);
    })
    .on('done', function() {
      console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
      console.log(photos);
      res.render('admin', { photos: photos });
    })
  .walk();

});

module.exports = router;
