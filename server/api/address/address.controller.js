/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/addresses              ->  index
 */

'use strict';

var _ = require('lodash');
var Address = require('./address.model');

// Get list of products
exports.index = function(req, res) {
  Address.find(function (err, addresses) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(addresses);
  });
};

// Get a single product
exports.show = function(req, res) {
  Address.findById(req.params.id, function (err, address) {
    if(err) { return handleError(res, err); }
    if(!address) { return res.status(404).send('Not Found'); }
    return res.json(address);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Address.create(req.body, function(err, address) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(address);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Address.findById(req.params.id, function (err, address) {
    if (err) { return handleError(res, err); }
    if(!address) { return res.status(404).send('Not Found'); }
    var updated = _.merge(address, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(address);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Address.findById(req.params.id, function (err, address) {
    if(err) { return handleError(res, err); }
    if(!address) { return res.status(404).send('Not Found'); }
    address.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}