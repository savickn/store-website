'use strict';

var _ = require('lodash');
var Monitor = require('./monitor.model');

// Get list of monitors
exports.index = function(req, res) {
  Monitor.find({__t: 'Monitor'}, function (err, monitors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(monitors);
  });
};

// Get a single monitor
exports.show = function(req, res) {
  Monitor.findById(req.params.id, function (err, monitor) {
    if(err) { return handleError(res, err); }
    if(!monitor) { return res.status(404).send('Not Found'); }
    return res.json(monitor);
  });
};

// Creates a new monitor in the DB.
exports.create = function(req, res) {
  Monitor.create(req.body, function(err, monitor) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(monitor);
  });
};

// Updates an existing monitor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Monitor.findById(req.params.id, function (err, monitor) {
    if (err) { return handleError(res, err); }
    if(!monitor) { return res.status(404).send('Not Found'); }
    var updated = _.merge(monitor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(monitor);
    });
  });
};

// Deletes a monitor from the DB.
exports.destroy = function(req, res) {
  Monitor.findById(req.params.id, function (err, monitor) {
    if(err) { return handleError(res, err); }
    if(!monitor) { return res.status(404).send('Not Found'); }
    monitor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}