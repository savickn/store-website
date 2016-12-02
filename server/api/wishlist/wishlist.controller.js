/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /y              ->  index
 */

'use strict';

var _ = require('lodash');
var Wishlist = require('./wishlist.model');
var User = require('../user/user.model');


// Get a single wishlist
exports.show = function(req, res) {
  Wishlist.findById(req.params.id, function (err, wishlist) {
    if(err) { return handleError(res, err); }
    if(!wishlist) { return res.status(404).send('Not Found'); }
    return res.json(wishlist);
  });
};

/*
* Returns list of public wishlists based on search criteria
*/

exports.search = function(req, res) {
  var searchObj = _.merge({}, req.query);

  var query = User.find(searchObj);
  query.select('name wishlist');
  query.populate('wishlist');
  query.exec(function(err, users) {
    if(err) return res.status(500).send(err);

    var wishlists = users.map((user) => {
    	if(!user.wishlist.private) {
    		return {_id: user.wishlist._id, name: user.name, products: user.wishlist.products};
    	}
    });

    return res.status(200).json(wishlists);
  });
}

/**
** updates wishlist (for add and remove)
**/

exports.update = function(req, res) {
  Wishlist.findOneAndUpdate(
      {_id: req.params.id}, 
      {$set: {products: req.body.products, private: req.body.private}},
      {new: true}
    )
  	.populate('products')
    .exec(function(err, wishlist) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(wishlist);
    }
	);
};

function handleError(res, err) {
  return res.status(500).send(err);
}





/* Adds item to wishlist

exports.addToWishlist = function(req, res) {
  Wishlist.findOneAndUpdate({user: req.params.id}, {$push: {products: req.body.productId}}, function(err, wishlist) {
    if(err) return res.status(500).send(err);
    return res.status(200).json(res);
  });
}

#### Removes item from wishlist

exports.removeFromWishlist = function(req, res) {
  Wishlist.findOneAndUpdate({user: req.params.id}, {$pull: {products: req.body.productId}}, function(err, wishlist) {
    if(err) return res.status(500).send(err);
    return res.status(200).json();
  });
}

*/