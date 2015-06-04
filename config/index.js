var config = {};

config.userImg = {
	width: 292,
	height: 292
};

config.photoLib = process.env.PHOTO_LIB  || './routes';

config.log = function() {
  console.log('config:' + this.photoLib);
};

console.log('lib ' + config.photoLib);
console.log(__dirname);

module.exports = config;
