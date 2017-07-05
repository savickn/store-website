'use strict';

var _ = require('lodash');
var Sale = require('./sale.model');
var Product = require('../product/product.model').model;

//populates necessary data when creating a new sale.
exports.new = function(req, res) {
  Product.getCategories().then(function(categories) {
    Product.getBrands().then(function(brands) {
      return res.status(200).json({'categories': categories, 'brands': brands});
    });
  });
};

//returns an active sale if it exists
exports.applyPromotion = function(req, res) {
  Sale.findByPromotionalCode(req.query.promoCode).then(function(sale) {
    //console.log('sale', sale);
    return sale.isActive() ? res.status(200).json(sale) : res.status(500).send(new Error('This sale is no longer active.'));
  }).catch(function(err) {
    //console.log('err', err);
    return res.status(500).send(err);
  });
};

// Creates a new sale.
exports.create = function(req, res) {
  Sale.create(req.body, function(err, sale) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(sale);
  });
};

// Get list of active sales
exports.index = function(req, res) {
  Sale.find({endDate: {$gt: Date.now()}}, function (err, sales) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(sales);
  });
};

// Updates a sale.
exports.update = function(req, res) {
  Sale.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, function(err, sale) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(sale);
  });
};

// Deletes a sale.
exports.destroy = function(req, res) {
  Sale.findById(req.params.id, function (err, sale) {
    if(err) { return handleError(res, err); }
    if(!sale) { return res.status(404).send('Not Found'); }
    sale.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}



// Get a single computer
/*exports.show = function(req, res) {
  Sale.findById(req.params.id, function (err, sale) {
    if(err) { return handleError(res, err); }
    if(!sale) { return res.status(404).send('Not Found'); }
    return res.json(sale);
  });
};*/
