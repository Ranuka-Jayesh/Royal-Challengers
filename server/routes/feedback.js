const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');

// POST - Submit feedback form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, rating, serviceType, message } = req.body;

    // Validate required fields
    if (!name || !email || !rating || !serviceType || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating must be between 1 and 5' 
      });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please try again later.'
      });
    }

    // Create new feedback submission
    const feedback = new Feedback({
      name,
      email,
      rating,
      serviceType,
      message
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! We appreciate your input.',
      data: feedback
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again.'
    });
  }
});

// GET - Get all feedback submissions (for admin)
router.get('/all', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: [],
        message: 'Database not connected - returning empty results'
      });
    }

    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: feedbacks
    });
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback submissions'
    });
  }
});

// GET - Get feedback statistics
router.get('/stats', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: {
          totalFeedbacks: 0,
          averageRating: 0,
          ratingDistribution: [],
          serviceTypeDistribution: []
        },
        message: 'Database not connected - returning empty stats'
      });
    }

    const totalFeedbacks = await Feedback.countDocuments();
    const averageRating = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    
    const ratingDistribution = await Feedback.aggregate([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const serviceTypeDistribution = await Feedback.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalFeedbacks,
        averageRating: averageRating[0]?.avgRating || 0,
        ratingDistribution,
        serviceTypeDistribution
      }
    });
  } catch (error) {
    console.error('Get feedback stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics'
    });
  }
});

module.exports = router; 