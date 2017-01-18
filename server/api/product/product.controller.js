'use strict';

var _ = require('lodash');
var Product = require('./product.model');


exports.search = function(req, res) {
  var defaultSearch = {
    price: {$gt: 0, $lt: 10000000}
  };

  console.log(req.query);

  var searchObj = _.merge(defaultSearch, req.query);

  if(req.query.name) { searchObj.name = new RegExp(req.query.name, "i"); }
  if(req.query.minPrice >= 0) { searchObj.price['$gt'] = req.query.minPrice; } 
  if(req.query.maxPrice >= 0) { searchObj.price['$lt'] = req.query.maxPrice; }

  /*if(req.body.brand.length > 0) { searchObj.brand = {$in: req.body.brand}; }
  if(req.body.motherboard.length > 0) { searchObj.motherboard = {$in: req.body.motherboard}; }
  if(req.body.cpu.length > 0) { searchObj.cpu = {$in: req.body.cpu}; }
  if(req.body.gpu.length > 0) { searchObj.gpu = {$in: req.body.gpu}; }*/


  var productCount = 0;
  Product.model.count(searchObj, function(err, count) {
    if(err) { return handleError(res, err); }
    productCount = count;
  
    var query = Product.model.find(searchObj).populate('displayPicture', '_id contentType path');

    if(req.query.page && req.query.perPage) {
      query = query.skip((req.query.page-1) * req.query.perPage)
                   .limit(req.query.perPage);
    } 

    query.exec(function (err, products) {
        if(err) { return handleError(res, err); }
        //response.computers = computers;
        return res.status(200).header('total-Products', productCount).json(products);
    });
  });
};

exports.featured = function(req, res) {
  Product.model.find({featured: true})
  .populate('displayPicture')
  .exec(function(err, products) {
    if(err) {return handleError(res, err);}
    return res.status(200).json(products);
  });
}

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.model.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}



/*

// Get list of products
exports.index = function(req, res) {
  Product.model.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};


// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


*/