'use strict';

var express = require('express');
var controller = require('./reward.controller');

var router = express.Router();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);

module.exports = router;
