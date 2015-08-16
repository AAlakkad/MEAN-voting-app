'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var PollSchema = new Schema({
  name: {type: String, required: true},
  user_id: {type: Schema.Types.ObjectId, required: true},
  description: String,
  date: {type: Date, default: Date.now},
  options: [
    {
      name: {type: String, required: true},
      votes: [ {voter_id: Schema.Types.ObjectId}],
    }
  ]
});

/**
 * Validation
 */
PollSchema.path('name').validate(function(name){
    return name.length;
}, 'Poll name can not be blank');

PollSchema.path('user_id').validate(function(id, respond) {
    if(id == undefined) return false;
    if(typeof id != 'object') return false;
    User.findOne({_id: id}, function(err, doc) {
        if(err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });
}, 'Given user_id does not exists');

/**
 * Pre-save hook
 */

PollSchema.pre('save', function(next) {
    if(! this.isNew) return next();
    next();
});

module.exports = mongoose.model('Poll', PollSchema);
