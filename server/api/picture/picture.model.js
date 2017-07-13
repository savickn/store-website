'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs-extra');

var PictureSchema = new Schema({
  //image: Buffer,
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    match: [/image\/(jpeg|jpg|png)/, "This file's format is incorrect."],
    required: true
  },
  size: {
    type: Number,
    max: 4000000, //4 MB
    required: true
  },
  path: { //can either be a local path or S3 path
    type: String,
    required: true
  },
  displayPicture: {
    type: Boolean,
    default: false
  },
  product: 	{
  	type: Schema.Types.ObjectId,
    required: true
  }
});

/**
** VALIDATIONS
**/




/**
** PRE && POST HOOKS
**/

//used to update DisplayPicture field of Product if necessary
PictureSchema.pre('save', function(next) {
	if(this.displayPicture === true) {
    mongoose.model('Product').findOneAndUpdate({'_id': this.product}, {$set: {displayPicture: this._id}, $push: {pictures: this._id}}).exec();
  } else {
    mongoose.model('Product').findOneAndUpdate({'_id': this.product}, {$push: {pictures: this._id}}).exec();
  }
	next();
});

//data consistency with Product entry
PictureSchema.pre('remove', function(next) {
  mongoose.model('Product').update({'_id': this.product}, {$pop: {pictures: this._id}}).exec();
  next();
});


module.exports = mongoose.model('Picture', PictureSchema);
