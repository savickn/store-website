/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Orders              ->  index
 */

'use strict';

var _ = require('lodash');
var Order = require('./order.model');

// Search orders
exports.search = function(req, res) {
  var searchObj = req.query.search;
  var pageObj = req.query.pagination;

  Order.count(searchObj, function(err, count) {
    if(err) { return handleError(res, err); }
    var orderCount = count;

    var query = Order.find(searchObj).populate('customer', '-salt -hashedPassword').populate('products');

    if(pageObj.page && pageObj.perPage) {
      query = query.skip((pageObj.page-1) * pageObj.perPage)
                   .limit(pageObj.perPage);
    }
    Order.find(searchObj, function (err, orders) {
      if(err) { return handleError(res, err); }
      return res.status(200).header('total-orders', orderCount).json(orders);
    });
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
  Order.findById(req.params.id)
    .populate('customer giftee', '-hashedPassword -salt')
    .populate('products')
    .exec(function (err, order) {
    if(err) { return handleError(res, err); }
    return res.json(order);
  });
};

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 10) {
    num = "0" + num;
  };
  return num;
};

// should return the final price of the product
// should check:
//    product matches Brand
//    product is onSale
//    sale is Stackable
//    product already has promotion applied
function calcSalePrice(product, sales) {
  let salePrice = product.price;
  let mainPromo = null;
  let stackables = [];

  for(let s of sales) {
    // skips iteration if Product is discounted and Sale does not apply to discounted Products
    if(!s.appliesToDiscountedProducts && product.discount > 0) {
      continue;
    }
    // adds Sale if stackable
    if(s.stackable && !stackables.includes(s)) {
      stackables.push(s);
    } else {
      // handles primary Sales
      if(!mainPromo || s.discountRate > mainPromo.discountRate) {
        mainPromo = s;
      }
    }
  };
  // applies primary Sale
  if(mainPromo) {
    salePrice *= (1 - mainPromo.discountRate);
  }
  // applies stackables
  for(let s of stackables) {
    salePrice *= (1 - promo.discountRate);
  }
  return salePrice;
}

// Creates a new order in the DB. Req must provide tax/shipping cost/subtotal
exports.create = function(req, res) {
  let defaultObj = {
    status: 'Awaiting Pre-Auth',
    orderDate: new Date()
  };

  // used to keep track of price changes for product
  let productPromotions = {};

  for(let product of req.body.products) {
    console.log('order product', product);
    productPromotions[product] = {
      'promos': [],
      'price': product.price
    };
    for(let sale of res.body.promotions) {
      if(sale.isApplicable([product.__t, product.brand])) {
        productPromotions[product].promos.push(sale);
      }
    }
    productPromotions[product].price = calcSalePrice(product, productPromotions[product].promos);
  }

  let subtotal = 0;
  for(let p in productPrices) {
    subtotal += p.price;
  }

  Order.count({}, function(err, count) {
    let number = count + 1;
    defaultObj.orderNumber = addLeadingZeroes(number);

    let order = _.merge(defaultObj, req.body);
    order.subTotal = subtotal;
    console.log('order', order);
    Order.create(order, function(err, order) {
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
    var updated = _.merge(order, req.body);
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

/*
function isStackable(sale, activePromos) {
  if(sale.stackable) {
    for(let promo of activePromos) {
      if(!promo.stackable) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}
*/
