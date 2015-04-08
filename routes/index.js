var express = require('express');
var router = express.Router();
var photos = require('./photos');
/* GET home page. */
router.get('/trivia', photos);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
