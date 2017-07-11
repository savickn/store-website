'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/featured', controller.featured);
router.get('/:id/recommended', controller.getRecommendedProducts);
router.delete('/:id', controller.destroy);
//router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);

module.exports = router;
