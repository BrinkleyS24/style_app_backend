const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  const { serviceProviderId, customerId, rating, reviewText } = req.body;
  try {
    const review = new Review({ serviceProvider: serviceProviderId, customer: customerId, rating, reviewText });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceProvider: req.user.id });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
