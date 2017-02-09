'use strict';

var _ = require('lodash');

var countries = ['Canada', 'USA'];

var provinceMap = {
  'Canada': [
    'Ontario',
    'Manitoba',
    'Quebec',
    'Alberta'
  ],
  'USA': [
    'New York',
    'California',
    'Texas',
    'Florida'
  ]
};

var taxMap = {
  'Ontario': 0.13,
  'Manitoba': 0.13,
  'Quebec': 0.13,
  'Alberta': 0.05,
  'New York': 0.10,
  'California': 0.10,
  'Texas': 0.00,
  'Florida': 0.05
}

// Get a single computer
exports.countries = function(req, res) {
  return res.status(200).json(countries);
};

exports.provinces = function(req, res) {
  var provinces = provinceMap[req.query.country];
  return res.status(200).json(provinces);
};

exports.taxes = function(req, res) {
  var taxRate = taxMap[req.query.province];
  return res.status(200).json(taxRate);
}

function handleError(res, err) {
  return res.status(500).send(err);
};
