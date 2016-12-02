'use strict';

var express = require('express');
var controller = require('./wishlist.controller');

var router = express.Router();

router.get('/search', controller.search);
router.put('/:id', controller.update);
//router.put('/:id/add', controller.addToWishlist);
//router.put('/:id/remove', controller.removeFromWishlist);
router.get('/:id', controller.show);

module.exports = router;
