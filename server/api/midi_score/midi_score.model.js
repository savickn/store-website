'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs-extra');

var MidiScoreSchema = new Schema({
  filename: String,
  contentType: String,
  size: Number,
  path: String,
  midiFile: Buffer,


  
  
  private: {
    type: Boolean,
    default: false
  },
  author:   { 
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  valid_users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }]
});

/*PictureSchema.statics.getPictureId = function(filename, cb) {
  return this.find({filename: filename}, '_id');
}*/

MidiScoreSchema.pre('save', function(next) {

  next();
});

MidiScoreSchema.pre('remove', function(next) {

  next();
});



module.exports = mongoose.model('MidiScore', MidiScoreSchema);