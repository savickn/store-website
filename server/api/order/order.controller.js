/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Orders              ->  index
 */

'use strict';

var _ = require('lodash');
var Order = require('./order.model');


exports.checkout = function(req, res) {
  console.log(req.body);
  return res.status(200).json(req.body);
};

// Search orders
exports.search = function(req, res) {
  var searchObj = req.query.search;
  var pageObj = req.query.pagination;

  /*var orderCount = 0;
  Order.count(searchObj, function(err, count) {
    if(err) { return handleError(res, err); }
    orderCount = count;
  });*/

  var query = Order.find(searchObj).populate('customer', '-salt -hashedPassword').populate('products');

  if(pageObj.page && pageObj.perPage) {
    query = query.skip((pageObj.page-1) * pageObj.perPage)
                 .limit(pageObj.perPage);
  }

  Order.find(searchObj, function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.status(200).header('total-orders', orders.length).json(orders);
  });
};

// Get list of orders
exports.index = function(req, res) {
  Order.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(orders);
  });
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, Order) {
    if(err) { return handleError(res, err); }
    return res.json(order);
  });
};

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 8) {
    num = "0" + num;
  };
  return num;
};

// Creates a new order in the DB. Req must provide tax/shipping cost/subtotal
exports.create = function(req, res) {
  var defaultObj = {
    status: 'Awaiting Pre-Auth',
    orderDate: Date.now()
  };

  Order.count({}, function(err, count) {
    var number = count + 1;
    defaultObj.orderNumber = addLeadingZeroes(number);

    var order = _.merge(defaultObj, req.body);
    console.log(order);
    Order.create(order, function(err, Order) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(order);
    });
  });
};

// Updates an existing order in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Order.findById(req.params.id, function (err, order) {
    if (err) { return handleError(res, err); }
    if(!order) { return res.status(404).send('Not Found'); }
    var updated = _.merge(Order, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.status(404).send('Not Found'); }
    order.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
};

/*aync function generateOrderNumber() {
  Order.count({}, function(err, count) {
    var number = count + 1;
    return addLeadingZeroes(number);
  })
}*/
