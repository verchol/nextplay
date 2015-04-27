var express = require('express');
var path    = require('path');
var fs      = require('fs');
var config  = require('../config');
var router  = express.Router();



function rename(req, res)
{
	var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
   var remoteIp = ip.split(':');

   ip = remoteIp[remoteIp.length - 1];
   var ips = ip.split('.');
   ip = 'user_' + ips[ips.length - 1];

   console.log('remote ip' + remoteIp[remoteIp.length - 1]);
   console.log("ip:" + ip);
   
   
   return ip;

}

router.post('/photo', function(req, res, next) {
  var photo = req.body.photo.replace(/^data:image\/png;base64,/, '');
 

  console.log('saving into :' + photoPath);
  var ip  = rename(req, res);
  //var photoPath = path.resolve((config.photoLib || __dirname), './photos', Date.now().toString() + '.png');
  var photoPath = path.resolve((config.photoLib || __dirname), './photos', ip + '.png');
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
