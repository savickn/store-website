'use strict';

var express = require('express');
var controller = require('./midi_score.controller');
var router = express.Router();

router.get('/read', controller.read)

router.get('/', controller.index); //show all
router.get('/:id', controller.show); //connect to specific socket IO stream
router.post('/', controller.create); //creates project
router.delete('/:id', controller.destroy); //deletes project

module.exports = router;