'use strict';

var _ = require('lodash');
var Keyboard = require('./keyboard.model');

// Get list of keyboards
exports.index = function(req, res) {
  Keyboard.find(function (err, keyboards) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(keyboards);
  });
};

// Get a single keyboard
exports.show = function(req, res) {
  Keyboard.findById(req.params.id, function (err, keyboard) {
    if(err) { return handleError(res, err); }
    if(!keyboard) { return res.status(404).send('Not Found'); }
    return res.json(keyboard);
  });
};

// Creates a new keyboard in the DB.
exports.create = function(req, res) {
  Keyboard.create(req.body, function(err, keyboard) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(keyboard);
  });
};

// Updates an existing keyboard in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Keyboard.findById(req.params.id, function (err, keyboard) {
    if (err) { return handleError(res, err); }
    if(!keyboard) { return res.status(404).send('Not Found'); }
    var updated = _.merge(keyboard, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(keyboard);
    });
  });
};

// Deletes a keyboard from the DB.
exports.destroy = function(req, res) {
  Keyboard.findById(req.params.id, function (err, keyboard) {
    if(err) { return handleError(res, err); }
    if(!keyboard) { return res.status(404).send('Not Found'); }
    keyboard.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}