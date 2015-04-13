var express = require('express');
var router =  express.Router();
var path   =  require('path');
var fs     =  require('fs');

router.post('/photo', function(req, res, next) {
  var photo = req.body.photo.replace(/^data:image\/png;base64,/, '');
  var photoPath = path.resolve(__dirname, './photos', Date.now().toString() + '.png');

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
