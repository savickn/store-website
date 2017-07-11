'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var Picture = require('./picture.model');
var mkdirp = require('mkdirp');


// Get a single picture
exports.show = function(req, res) {
  Picture.findById(req.params.id, '_id contentType path', function (err, picture) {
    if(err) { return handleError(res, err); }
    if(!picture) { return res.status(404).send('Not Found'); }

    res.contentType(picture.contentType);
    return res.json(picture);
  });
};

// Creates a new picture in the DB.
exports.createLocal = function(req, res) {
  var productType = req.body.productType.toLowerCase();
  var path = req.files.file.path;
  var destination = 'server/public/' + productType;
  var image = fs.readFileSync(path);

  mkdirp(destination, function(err) {
    var rstream = fs.createReadStream(path)
      .pipe(fs.createWriteStream(destination + '/' + req.body.filename));

    rstream.on('finish', function () {
      var body = {image: image, filename: req.body.filename, product: req.body.product,
        displayPicture: req.body.displayPicture, size: req.body.size, contentType: req.body.contentType,
        path: productType + '/' + req.body.filename};
      Picture.create(body, function(err, picture) {
        if(err) { return handleError(res, err); }

        var pictureObj = {};
        pictureObj._id = picture._id;
        pictureObj.contentType = picture.contentType;
        pictureObj.path = picture.path;
        //res.contentType(picture.contentType);
        return res.status(201).json(pictureObj);
      });
    });
  });
};

exports.createS3 = function(req, res) {
  return res
}

// Deletes a picture from the DB.
exports.destroy = function(req, res) {
  Picture.findById(req.params.id, function (err, picture) {
    if(err) { return handleError(res, err); }
    if(!picture) { return res.status(404).send('Not Found'); }
    picture.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}


/*      res.contentType(picture.contentType);
      return res.status(201).send(picture.image); */

/*function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}*/

  /*GRIDFS
  var extension = req.files.file.path.split(/[. ]+/).pop();
  var is = fs.createReadStream(req.files.file.path);
  var os = gridfs.createWriteStream({ filename: shortId.generate()+'.'+extension });

  is.pipe(os);

  os.on('close', function (file) {
    //delete file from temp folder
    fs.unlink(req.files.file.path, function() {
      res.json(200, file);
    });
  });*/

  /*var log4js = require('log4js');
  log4js.configure({
    appenders: [
      { type: 'console' },
      { type: 'file', filename: 'logs/picture.log', category: 'picture' }
    ]
  });
  var logger = log4js.getLogger('picture');*/
