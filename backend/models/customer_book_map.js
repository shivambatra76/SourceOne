const mongoose = require('mongoose');


const customerBookMapSchema = new mongoose.Schema({
  customer_id: Number,
  book_id: String,
  lend_date: Date,
  expected_return_date: Date
});

const CustomerBookMap = mongoose.model('customer_book', customerBookMapSchema);

module.exports = { CustomerBookMap };
