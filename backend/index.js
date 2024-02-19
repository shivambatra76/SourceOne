// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const mongoose = require('mongoose');
const { Book } = require('./models/books');
const { CustomerBookMap } = require('./models/customer_book_map');

const app = express();
const PORT = config.get('server.port');

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

  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
