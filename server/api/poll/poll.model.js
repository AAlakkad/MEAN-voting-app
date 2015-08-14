'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  user_id: Schema.Types.ObjectId,
  description: String,
  date: {type: Date, default: Date.now},
  options: {
    option: {
      name: String,
      votes: Number,
    }
  }
});

module.exports = mongoose.model('Poll', PollSchema);
