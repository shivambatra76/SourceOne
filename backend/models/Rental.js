const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var RentalModel = new Schema({
  customer_id: {
    type: Number
  },
  book_id: {
    type: String
  },
  lend_date: {
    type: String
  },
  expected_return_date:{
    type: Date
  }

},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('rental', RentalModel,'rental');


