'use strict';

var _ = require('lodash');
var Review = require('./review.model');

// Get list of reviews
exports.index = function(req, res) {
  Review.find(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id)
  .populate('product', '_id name')
  .populate('author', '_id name')
  .exec(function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.status(404).send('Not Found'); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  Review.create(req.body, function(err, review) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(review);
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  Review.findOneAndUpdate(
      {_id: req.params.id}, 
      {$set: req.body},
      {new: true}
    )
    .populate('product', '_id name')
    .populate('author', '_id name')
    .exec(function(err, review) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(review);
    });





  /*Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.status(404).send('Not Found'); }
    
    var updated = _.merge(review, req.body);
    updated.upvotes = req.body.upvotes;
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(review);
    });
  });*/
};

/*used to upvote
exports.upvote = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.update(
    { _id: req.params.id}, 
    { $addToSet: {upvotes: req.body.upvotes.last} }, 
    function(err, data) {
      if (err) { return handleError(res, err); }
      if(!review) { return res.status(404).send('Not Found'); }
    });
}*/

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.status(404).send('Not Found'); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}