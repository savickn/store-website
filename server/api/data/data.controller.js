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
    'California'
  ]
};

// Get a single computer
exports.countries = function(req, res) {
  return res.json(countries);
};

exports.provinces = function(req, res) {
  console.log(req.query.country);
  var provinces = provinceMap[req.query.country];
  return res.json(provinces);
};

function handleError(res, err) {
  return res.status(500).send(err);
};


