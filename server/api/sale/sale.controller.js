'use strict';

var _ = require('lodash');
var Sale = require('./sale.model');
var Product = require('../product/product.model').model;

exports.new = function(req, res) {
  Product.getCategories().then(function(categories) {
    Product.getBrands().then(function(brands) {
      return res.status(200).json({'categories': categories, 'brands': brands});
    });
  });
};

function validateSale(sale, product) {
  return (sale.isActive() && sale.isApplicable(product.__t)) ? true:false;
};

exports.applyPromotion = function(req, res) {
  Sale.findByPromotionalCode(req.query.promoCode).then(function(sale) {
    if(err) {return handleError(res, err);}
    if(sale.isActive()) {
      return res.status(200).json(sale);
    } else {
      error = new Error('This sale is no longer active.');
      return handleError(res, error);
    }
  });
};

// Creates a new computer in the DB.
exports.create = function(req, res) {
  Sale.create(req.body, function(err, sale) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(sale);
  });
};

// Get list of computers
exports.index = function(req, res) {
  Sale.find({endDate: {$gt: Date.now()}}, function (err, sales) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(sales);
  });
};

// Updates an existing computer in the DB.
exports.update = function(req, res) {
  Sale.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, function(err, sale) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(sale);
  });
};

// Deletes a computer from the DB.
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
