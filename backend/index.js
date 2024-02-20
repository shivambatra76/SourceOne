// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const mongoose = require('mongoose');
const { Book } = require('./models/books');
const { CustomerBookMap } = require('./models/customer_book_map');

const app = express();
const PORT = config.get('server.port');
const DEFAULT_RENTAL_CHARGES = config.get("defaultRentalCharges");
// Connection to MongoDB
mongoose.connect(config.get('mongodb.url'), config.get('mongodb.options'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());


app.get('/book-availability', async (req, res) => {
  try {
    const { book_name } = req.query;
    const book = await Book.findOne({ book_name });
    if (!book) {
      return res.status(200).json({ error: 'Book not found' });
    }
    const lendStatuses = await CustomerBookMap.find({ book_id: book.book_id }).sort({ expected_return_date: 1 });

    if (lendStatuses.length === 0) {
        return res.json({ book_available: true, available_date: new Date() });
      } else {
        return res.json({ book_available: false, available_date: lendStatuses[0].expected_return_date });
      }  
  } catch (error) {
    console.error('Error checking book availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/rent-charges', async (req, res) => {
  try {
    const { customer_id, book_name } = req.body;

    if (!customer_id || !book_name) {
      return res.status(400).json({ error: 'Customer ID and Book ID are required' });
    }
    const book = await Book.findOne({book_name});

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const { book_id }= book;
    const customerBookRecord = await CustomerBookMap.findOne({ customer_id, book_id });

    if (!customerBookRecord) {
      return res.status(404).json({ error: 'Customer has not borrowed this book' });
    }
    const daysRented = Math.ceil((new Date() - customerBookRecord.lend_date) / (1000 * 60 * 60 * 24));
    const totalCharges = daysRented * DEFAULT_RENTAL_CHARGES ;
    res.json({ totalCharges });
  } catch (error) {
    console.error('Error calculating rent charges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
