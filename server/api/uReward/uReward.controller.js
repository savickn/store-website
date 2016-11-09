/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /y              ->  index
 */

'use strict';

var _ = require('lodash');
var UReward = require('./uReward.model');

// Get list of products
exports.index = function(req, res) {
  UReward.find(function (err, urewards) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(urewards);
  });
};

// Get a single product
exports.show = function(req, res) {
  UReward.findById(req.params.id, function (err, ureward) {
    if(err) { return handleError(res, err); }
    if(!ureward) { return res.status(404).send('Not Found'); }
    return res.json(ureward);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  UReward.create(req.body, function(err, ureward) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(ureward);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  UReward.findById(req.params.id, function (err, ureward) {
    if (err) { return handleError(res, err); }
    if(!ureward) { return res.status(404).send('Not Found'); }
    var updated = _.merge(ureward, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ureward);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  UReward.findById(req.params.id, function (err, ureward) {
    if(err) { return handleError(res, err); }
    if(!ureward) { return res.status(404).send('Not Found'); }
    ureward.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}