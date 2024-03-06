const express = require("express");
const libraryRouter = express.Router();
const libraryController = require('../controllers/library')

// const RENTAL_CHARGES = config.get("rentalCharges");

libraryRouter.post("/book-availability", libraryController.isBookAvailable);
libraryRouter.get("/pollApi", libraryController.poll);


libraryRouter.post("/rent-charges", libraryController.processRentalCharges);
// module.exports = libraryRouter;
exports.libraryRouter = libraryRouter;
