const mongoose = require('mongoose');
// const { BookModel } = require('./models');
const Models = require('./models');
const config = require('config');
mongoose.connect(config.get('mongodb.url'), config.get('mongodb.options'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const bookTypes = ["Regular", "Fiction", "Novel"];

async function addBookTypeToBooks() {
  try {


    const books = await Models.BooksModel.find();
    for (const book of books) {
      console.log(JSON.stringify(book));
      const randomIndex = Math.floor(Math.random() * bookTypes.length);
      const randomBookType = bookTypes[randomIndex];
      await Models.BooksModel.updateOne({ _id: book._id }, { $set: { book_type: randomBookType } });
    }

    console.log('Book types added successfully.');
  } catch (error) {
    console.error('Error adding book types:', error);
  } finally {
    mongoose.connection.close();
  }
}

addBookTypeToBooks();
