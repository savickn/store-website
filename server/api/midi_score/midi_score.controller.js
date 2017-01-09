'use strict';

var MidiScore = require('./midi_score.model');
var MIDI = require('midijs');
var fs = require('fs-extra');


exports.read = function(req, res) {
  fs.readFile('./public/Adagio Track 0.mid', function (err, data) {
    if (err) {
        throw err;
    }

    var file = new MIDI.File(data, function (err) {
        if (err) {
            throw err;
        }

        // file.header contains header data
        // file.tracks contains file tracks
    });

    return res.send(file);
  });
}




// Get list of MidiScores
exports.index = function(req, res) {
  MidiScore.find({}, function (err, midiScores) {
    if(err) { return handleError(res, err); }

    return res.status(200).json(midiScores);
  });
};

// Get a single MidiScore
exports.show = function(req, res) {
  MidiScore.findById(req.params.id, '_id contentType path', function (err, MidiScore) {
    if(err) { return handleError(res, err); }
    if(!MidiScore) { return res.status(404).send('Not Found'); }

    res.contentType(MidiScore.contentType);
    return res.json(MidiScore);
  });
};

// Creates a new MidiScore in the DB.
exports.create = function(req, res) {
  var productType = req.body.productType.toLowerCase();
  var path = req.files.file.path;
  var destination = 'server/public/' + productType;
  var image = fs.readFileSync(path);

  mkdirp(destination, function(err) {
    var rstream = fs.createReadStream(path)
      .pipe(fs.createWriteStream(destination + '/' + req.body.filename));
    
    rstream.on('finish', function () {
      var body = {image: image, filename: req.body.filename, product: req.body.product,
        displayMidiScore: req.body.displayMidiScore, size: req.body.size, contentType: req.body.contentType, 
        path: productType + '/' + req.body.filename};
      MidiScore.create(body, function(err, MidiScore) {
        if(err) { return handleError(res, err); }

        var MidiScoreObj = {};
        MidiScoreObj._id = MidiScore._id;
        MidiScoreObj.contentType = MidiScore.contentType;
        MidiScoreObj.path = MidiScore.path;
        //res.contentType(MidiScore.contentType);
        return res.status(201).json(MidiScoreObj);
      });
    });
  });
};


// Updates an existing MidiScore in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MidiScore.findById(req.params.id, function (err, MidiScore) {
    if (err) { return handleError(res, err); }
    if(!MidiScore) { return res.status(404).send('Not Found'); }
    var updated = _.merge(MidiScore, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(MidiScore);
    });
  });
};

// Deletes a MidiScore from the DB.
exports.destroy = function(req, res) {
  MidiScore.findById(req.params.id, function (err, MidiScore) {
    if(err) { return handleError(res, err); }
    if(!MidiScore) { return res.status(404).send('Not Found'); }
    MidiScore.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
