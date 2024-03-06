// const { Book } = require("../models/Books");
const Models = require('../models');
const responses = require('../lib/responses')
const commonFunctions = require('../commonFunctions');

const isBookAvailable = async (req, res) => {
  try {
    const { book_name } = req.body;
    const mainValues = [book_name]
    if (commonFunctions.checkBlank(mainValues)){
      return res.json({ statusCode: responses.responseFlags.PARAMETER_MISSING, error: responses.responseMessages.PARAMETER_MISSING})
    }
    const book = await Models.BooksModel.findOne({ book_name });
    if (!book) {
      return res.status(200).json({ statusCode: responses.responseFlags.SUCCESS, error: responses.responseMessages.BOOK_NOT_AVAILABLE});
    }
    const lendStatuses = await Models.RentalModel.find({
      book_id: book.book_id,
    }).sort({ expected_return_date: 1 });

    if (lendStatuses.length === 0) {
      return res.json({ statusCode: responses.responseFlags.SUCCESS , book_available: true, available_date: new Date() });
    } else {
      return res.json({
        statusCode: responses.responseFlags.SUCCESS,
        book_available: false,
        available_date: lendStatuses[0].expected_return_date,
      });
    }
  } catch (error) {
    console.error("Error checking book availability:", error);
    res.status(500).json({ statusCode: responses.responseFlags.SERVER_ERROR, error: responses.responseMessages.INTERNAL_ERROR });
  }
};
const processRentalCharges = async (req, res) => {
  try {
    const { customer_id, book_name } = req.body;
    const mainValues = [customer_id, book_name]
    if (commonFunctions.checkBlank(mainValues)){
      return res.json({ statusCode: responses.responseFlags.PARAMETER_MISSING, error: responses.responseMessages.PARAMETER_MISSING})
    }

    if (!customer_id || !book_name) {
      return res
        .status(400)
        .json({ error: responses.responseMessages.PARAMETER_MISSING });
    }
    const book = await Models.BooksModel.findOne({ book_name });

    if (!book) {
      return res.status(404).json({ statusCode: responses.responseFlags.SUCCESS, error: responses.responseMessages.BOOK_NOT_AVAILABLE });
    }
    const { book_id } = book;
    console.log("book", book);
    console.log("book_id", book_id);
    console.log("book", customer_id);
    console.log({
      customer_id,
      book_id,
    });
    const customerBookRecord = await Models.RentalModel.findOne({
      customer_id,
      book_id,
    });
    console.log("customerBookRecord", customerBookRecord);
    if (!customerBookRecord) {
      return res
        .status(404)
        .json({ error: "Customer has not borrowed this book" });
    }
    const daysRented = Math.ceil(
      (new Date() - new Date(customerBookRecord.lend_date)) / (1000 * 60 * 60 * 24)
    );
    console.log(daysRented);
    let chargePerDay;
    let minimumCharges;
    switch (book.book_type) {
      case "Fiction":
        chargePerDay = 3;
        minimumCharges = 0;
        break;
      case "Novel":
        chargePerDay = 1.5;
        minimumCharges = 4.5;
        break;
      default:
        if (daysRented <= 2) {
          chargePerDay = 1;
          minimumCharges = 2;
        } else {
          chargePerDay = 1.5;
          minimumCharges = 0;
        }
    }
    let totalCharges;
    if (daysRented <= 2) {
      totalCharges = Math.max(daysRented * chargePerDay, minimumCharges);
    } else {
      totalCharges = minimumCharges + (daysRented - 2) * chargePerDay;
    }
    console.log(totalCharges);
    res.json({ totalCharges });
  } catch (error) {
    console.error("Error calculating rent charges:", error);
    res.status(500).json({ statusCode: responses.responseFlags.SERVER_ERROR, error: responses.responseMessages.INTERNAL_ERROR });
  }
};

const poll = async(req, res) => {
  console.log('Polls API');
  res.status(200).json({ isWorking:true });
}

exports.isBookAvailable = isBookAvailable;
exports.processRentalCharges = processRentalCharges;
exports.poll = poll;
