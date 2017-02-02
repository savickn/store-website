'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs-extra');

var PictureSchema = new Schema({
  filename: String,
  contentType: String,
  size: Number,
  path: String,
  image: Buffer,
  displayPicture: {
    type: Boolean,
    default: false
  },
  product: 	{
  	type: Schema.Types.ObjectId
  }
});


PictureSchema.pre('save', function(next) {
	if(this.displayPicture === true) {
    mongoose.model('Product').findOneAndUpdate({'_id': this.product}, {$set: {displayPicture: this._id}, $push: {pictures: this._id}}).exec();
  } else {
    mongoose.model('Product').findOneAndUpdate({'_id': this.product}, {$push: {pictures: this._id}}).exec();
  }
	next();
});

PictureSchema.pre('remove', function(next) {
  fs.unlinkSync('server/public/' + this.path)
  mongoose.model('Product').update({'_id': this.product}, {$pop: {pictures: this._id}}).exec();
  next();
});



module.exports = mongoose.model('Picture', PictureSchema);
