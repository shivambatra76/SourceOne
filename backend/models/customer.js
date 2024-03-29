const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var CustomerModel = new Schema({
  customer_id: {
    type: Number
  },
  customer_name: {
    type: String
  }

},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('customers', CustomerModel);