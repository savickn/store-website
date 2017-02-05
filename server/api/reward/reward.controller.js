/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /y              ->  index
 */

'use strict';

var _ = require('lodash');
var Reward = require('./reward.model');

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 8) {
    num = "0" + num;
  };
  return num;
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Reward.count({}, function(err, count) {
    var number = count + 1;
    var cardNumber = addLeadingZeroes(number);

    var reward = {
      cardNumber: cardNumber,
      user: req.body.user
    };

    Reward.create(reward, function(err, reward) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(reward);
    });
  })
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  Reward.findById(req.params.id, function (err, reward) {
    if (err) { return handleError(res, err); }
    if(!reward) { return res.status(404).send('Not Found'); }
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(reward);
    });
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
