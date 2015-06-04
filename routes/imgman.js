var express = require('express');
var path    = require('path');
var fs      = require('fs');
var config  = require('../config');
var router  = express.Router();
var im = require('imagemagick');


function rename(req, res)
{
	var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
   var remoteIp = ip.split(':');

   ip = remoteIp[remoteIp.length - 1];
   var ips = ip.split('.');
   ip = ips[ips.length - 1];

   console.log('remote ip' + remoteIp[remoteIp.length - 1]);
   console.log("ip:" + ip);
   
   
   return ip;

}

router.get('/', function(req, res, next) {
	
	var img_name = req.query.img;
	var photoPath = path.resolve((config.photoLib || __dirname), './photos', img_name);
	
	
	im.identify(['-format', '%wx%h', photoPath], function(err, output){
	  if (err) {
	  	res.send(photoPath + ' || Error: ' + err);
	  }
	  else {

	  	res.send('dimension: '+output);
	  }
	});
	
	/*
	im.readMetadata(photoPath, function(err, metadata){
	  if (err) {
	  	res.send(photoPath + ' || Error: ' + err);
	  }
	  else {

	  	res.send(metadata);
	  }
	});*/
	//res.send("something");
});

router.get('/clean', function(req, res, next) {
	var ip  = rename(req, res);
	var photoPath = path.resolve((config.photoLib || __dirname), './photos', ip + '.png');
	
	if (fs.existsSync(photoPath)) {
		fs.unlink(photoPath);
		res.send(photoPath + " deleted");
	}
	else {
		res.send(photoPath + ' dose not exist');
	}	

});

router.get('/reaize', function(req, res, next) {
	var img_name = req.query.img;
	var photoPath = path.resolve((config.photoLib || __dirname), './photos', img_name);
	var dstPath = path.resolve((config.photoLib || __dirname), './photos', "test.png");
	im.resize({
	  srcPath: photoPath,
	  dstPath: dstPath,
	  width:   256
	}, function(err, stdout, stderr){
	  if (err) {
	  	res.send(photoPath + ' || Error: ' + err);
	  }
	  else {

	  	res.send('resized kittens.jpg to fit within 256x256px');
	  }
	});
});



module.exports = router;