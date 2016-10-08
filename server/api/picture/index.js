'use strict';

var express = require('express');
var controller = require('./picture.controller');
var router = express.Router();

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

/*var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, '../../uploads/pictures');
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now());
	}
});
var upload = multer({
	storage: storage,
	limits: {fileSize: 4000000, files: 1}
}).single('file');*/


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', multipartyMiddleware, controller.create);
//router.post('/', upload, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;