const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/globalimage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import models
const Contact = require('./models/Contact');
const Feedback = require('./models/Feedback');

// Routes

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      submittedAt: new Date()
    });

    await newContact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!'
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form'
    });
  }
});

// Feedback Form Submission
app.post('/api/feedback', async (req, res) => {
  try {
    const { 
      feedbackName, 
      feedbackEmail, 
      feedbackType, 
      feedbackMessage, 
      rating 
    } = req.body;
    
    const newFeedback = new Feedback({
      name: feedbackName,
      email: feedbackEmail,
      serviceType: feedbackType,
      message: feedbackMessage,
      rating,
      submittedAt: new Date()
    });

    await newFeedback.save();
    
    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!'
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback'
    });
  }
});

// Get all contacts (admin route)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Get all feedback (admin route)
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ submittedAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 