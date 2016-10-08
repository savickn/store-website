'use strict';

var _ = require('lodash');
var Upvote = require('./upvote.model');

// Get list of upvotes
exports.index = function(req, res) {
  Upvote.find(function (err, upvotes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(upvotes);
  });
};

// Get a single upvote
exports.show = function(req, res) {
  Upvote.findById(req.params.id, function (err, upvote) {
    if(err) { return handleError(res, err); }
    if(!upvote) { return res.status(404).send('Not Found'); }
    return res.json(upvote);
  });
};

// Creates a new upvote in the DB.
exports.create = function(req, res) {
  Upvote.create(req.body, function(err, upvote) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(upvote);
  });
};

// Updates an existing upvote in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Upvote.findById(req.params.id, function (err, upvote) {
    if (err) { return handleError(res, err); }
    if(!upvote) { return res.status(404).send('Not Found'); }
    var updated = _.merge(upvote, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(upvote);
    });
  });
};

// Deletes a upvote from the DB.
exports.destroy = function(req, res) {
  Upvote.findById(req.params.id, function (err, upvote) {
    if(err) { return handleError(res, err); }
    if(!upvote) { return res.status(404).send('Not Found'); }
    upvote.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}