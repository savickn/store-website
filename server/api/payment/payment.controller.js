'use strict';

var _ = require('lodash');
var PaymentMethod = require('./payment.model');

// Creates a new PaymentMethod in the DB.
exports.create = function(req, res) {
  PaymentMethod.create(req.body, function(err, payment) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(payment);
  });
};

// Deletes a PaymentMethod from the DB.
exports.destroy = function(req, res) {
  PaymentMethod.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.status(404).send('Not Found'); }
    payment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}