var express = require('express');
var router = express.Router();
var photos = require('./photos');
var config = require('../config');

/* GET home page. */
router.get('/trivia', photos);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/admin/:action', function(req, res){
  if (req.params.action == "config")
  {
    return res.send(config.photoLib);
  }

  return res.send(200);
})

module.exports = router;
