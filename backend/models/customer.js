const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customer_id: Number,
  customer_name: String
});


const Customer = mongoose.model('customers', customerSchema);

module.exports = { Customer };
