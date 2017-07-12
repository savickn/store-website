'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var Order = require('../order/order.model');

exports.getRecommendedProducts = function(req, res) {
  Order.find({products: {$in: [req.params.id]}}).sort({orderDate: 'desc'}).limit(100).exec(function(err, orders) {
    if(err) { return res.status(501).send(err); }

    console.log('recommended err', err);
    console.log('recommended orders', orders);

    let pCount = {};
    for(let o of orders) {
      for(let p of o.products) {
        pCount[p] = (pCount[p] || 0) + 1;
      }
    }
    console.log('recommended products', pCount);
    let sortedArr = Object.keys(pCount).sort(function(a,b) { return pCount[a] - pCount[b] })
    let sliced = sortedArr.slice(req.query.offset, req.query.offset + 3);

    console.log('sorted products', sortedArr);
    console.log('slice', sliced);

    Product.model.find({_id: {$in: sliced}}).select('-reviews -pictures -inventory').populate('displayPicture').exec(function(err, products) {
      if(err) { return res.status(501).send(err); }
      return res.status(200).json(products);
    })
  })
}

exports.search = function(req, res) {
  var search = JSON.parse(req.query.search);
  var pagination = JSON.parse(req.query.pagination);
  //console.log(search);

  var searchObj = {
    __t: search.__t,
    price: {"$gt": 0, "$lt": 1000000000}
  };

  if(search.name) { searchObj.name = new RegExp(search.name, "i"); }
  if(search.minPrice >= 0) { searchObj.price["$gt"] = search.minPrice; }
  if(search.maxPrice >= 0) { searchObj.price["$lt"] = search.maxPrice; }
  if(search.brand && search.brand.length > 0) { searchObj.brand = {$in: search.brand}; }

  if(search.motherboard && search.motherboard.length > 0) { searchObj.motherboard = {$in: search.motherboard}; }
  if(search.cpu && search.cpu.length > 0) { searchObj.cpu = {$in: search.cpu}; }
  if(search.gpu && search.gpu.length > 0) { searchObj.gpu = {$in: search.gpu}; }

  //console.log(searchObj);

  Product.model.count(searchObj, function(err, count) {
    if(err) { return handleError(res, err); }

    var query = Product.model.find(searchObj).populate('displayPicture', '_id contentType path');

    if(pagination.page && pagination.perPage) {
      query = query.skip((pagination.page-1) * pagination.perPage)
                   .limit(pagination.perPage);
    }

    query.exec(function (err, products) {
        if(err) { return handleError(res, err); }
        return res.status(200).header('total-Products', count).json(products);
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
