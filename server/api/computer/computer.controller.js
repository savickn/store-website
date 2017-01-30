'use strict';

var _ = require('lodash');
var Computer = require('./computer.model');

//search
exports.search = function(req, res) {
  var searchObj = {
    __t: 'Computer',
    price: {$gt: 0, $lt: 10000000}
  };

  if(req.body.name) { searchObj.name = new RegExp(req.body.name, "i"); }
  //if(req.body.minPrice && req.body.maxPrice) { searchObj.price = {$gt: req.body.minPrice, $lt: req.body
    //.maxPrice}; }
  if(req.body.minPrice >= 0) { searchObj.price['$gt'] = req.body.minPrice; }
  if(req.body.maxPrice >= 0) { searchObj.price['$lt'] = req.body.maxPrice; }

  if(req.body.brand.length > 0) { searchObj.brand = {$in: req.body.brand}; }
  if(req.body.motherboard.length > 0) { searchObj.motherboard = {$in: req.body.motherboard}; }
  if(req.body.cpu.length > 0) { searchObj.cpu = {$in: req.body.cpu}; }
  if(req.body.gpu.length > 0) { searchObj.gpu = {$in: req.body.gpu}; }

  if(req.body.onSale) { searchObj.onSale = req.body.onSale; }
  if(req.body.featured) { searchObj.featured = req.body.featured; }
  if(req.body.onlineOnly) { searchObj.onlineOnly = req.body.onlineOnly; }

  res.header('debug', searchObj);

  var query = Computer.find(searchObj).populate('displayPicture', '_id contentType path');

  query.exec(function (err, computers) {
    if(err) {return handleError(res, err);}
    return res.status(200).json(computers);
  });
};

// Get list of computers
exports.index = function(req, res) {
  var searchObj = {
    __t: 'Computer'
  };

  Computer.count(searchObj, function(err, count) {
    if(err) { return handleError(res, err); }
    var computerCount = count;

    var query = Computer.find(searchObj).populate('displayPicture', '_id contentType path');
  
    if(req.query.page && req.query.perPage) {
      query = query.skip((req.query.page-1) * req.query.perPage)
                   .limit(req.query.perPage);
    }
    query.exec(function (err, computers) {
        if(err) { return handleError(res, err); }
        return res.status(200).header('total-Computers', computerCount).json(computers);
    });
  });
};

// Get a single computer
exports.show = function(req, res) {
  Computer.findById(req.params.id).populate('reviews').populate('displayPicture pictures', '_id contentType path').exec(function (err, computer) {
    if(err) { return handleError(res, err); }
    if(!computer) { return res.status(404).send('Not Found'); }
    return res.json(computer);
  });
};

// Creates a new computer in the DB.
exports.create = function(req, res) {
  Computer.create(req.body, function(err, computer) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(computer);
  });
};

// Updates an existing computer in the DB.
exports.update = function(req, res) {
  Computer.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    .populate('reviews').populate('displayPicture pictures', '_id contentType path')
    .exec(function(err, computer) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(computer);
    });
};

// Deletes a computer from the DB.
exports.destroy = function(req, res) {
  Computer.findById(req.params.id, function (err, computer) {
    if(err) { return handleError(res, err); }
    if(!computer) { return res.status(404).send('Not Found'); }
    computer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}




  /* old update function


  Computer.findById(req.params.id, function (err, computer) {
    if (err) { return handleError(res, err); }
    if(!computer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(computer, req.body);
    updated.save().populate('displayPicture pictures', '_id contentType path')
    .exec(function (err, computer) {
      if (err) { return handleError(res, err); }

      return res.status(200).json(computer);
    });
  });*/
