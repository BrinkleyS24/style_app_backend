const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  customer: { type: String, required: true }, 
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
