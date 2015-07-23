var express = require('express');
var path = require('path');
var fs = require('fs');
var config = require('../config');
var router = express.Router();
var im = require('imagemagick');


function rename(req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var remoteIp = ip.split(':');

    ip = remoteIp[remoteIp.length - 1];

    var ips = ip.split('.');
    ip = ips[ips.length - 1] + "";
    ip = ip.substr(ip.length - 2, 2);

    if(parseInt(ip) < 10) {
        // fix leading zero bug
        ip = parseInt(ip) + "";
    }
    return ip;

}

router.post('/photo', function (req, res, next) {
    var photo = req.body.photo.replace(/^data:image\/png;base64,/, '');

    var ip = rename(req, res);
    //var photoPath = path.resolve((config.photoLib || __dirname), './photos', Date.now().toString() + '.png');
    var photoPath = path.resolve((config.photoLib || __dirname), './photos', ip + '.png');

    console.log('saving into :' + photoPath);

    fs.writeFile(photoPath, photo, 'base64', function (err) {
        if (!err) {

            // resize img
            im.resize({
                srcPath: photoPath,
                dstPath: photoPath,
                width: config.userImg.width,
                height: config.userImg.height,
            }, function (err, stdout, stderr) {
                if (err) {
                    console.log('resize error...');
                    res.send(photoPath + ' || Error: ' + err);
                }
                else {

                    res.send('ok');
                }
            });


        } else {
            console.log(err);
        }
    });
});

module.exports = router;
