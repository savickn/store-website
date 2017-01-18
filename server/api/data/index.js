'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/countries', controller.countries);
router.get('/provinces', controller.provinces);


module.exports = router;