var express = require('express');
var router =  express.Router();
var path   =  require('path');
var fs     =  require('fs');

/* GET users listing. */
router.get('/photos', function(req, res, next) {
  res.send('saved photos are ');
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('works');
});

router.get('/photos/:photo', function(req, res, next) {
  var photo  = req.params.photo;
  console.log(req.files);
  var p = path.resolve(__dirname, "./photos", photo);
  fs.writeFile(p, function(err){
    console.log("thanks for sending photo:" + photo);
    res.send("photo saved");
  });

});
router.post('/photos/:photo', function(req, res, next) {
  console.log("photo posted");
  console.log(req.files);
  var photo  = req.params.photo;
  var p = path.resolve(__dirname, "./photos", photo);
  fs.writeFile(p, function(err){
    console.log("thanks for sending photo:" + photo);
    res.send("photo saved");
  });

});

module.exports = router;
