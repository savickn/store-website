/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/purchases              ->  index
 */

'use strict';

var _ = require('lodash');
var Purchase = require('./purchase.model');

// Get list of products
exports.index = function(req, res) {
  Purchase.find(function (err, purchases) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(purchases);
  });
};

// Get a single product
exports.show = function(req, res) {
  Purchase.findById(req.params.id, function (err, purchase) {
    if(err) { return handleError(res, err); }
    if(!ureward) { return res.status(404).send('Not Found'); }
    return res.json(purchase);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Purchase.create(req.body, function(err, purchase) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(purchase);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Purchase.findById(req.params.id, function (err, purchase) {
    if (err) { return handleError(res, err); }
    if(!purchase) { return res.status(404).send('Not Found'); }
    var updated = _.merge(purchase, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(purchase);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Purchase.findById(req.params.id, function (err, purchase) {
    if(err) { return handleError(res, err); }
    if(!purchase) { return res.status(404).send('Not Found'); }
    purchase.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}



