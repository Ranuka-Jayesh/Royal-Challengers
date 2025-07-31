import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({
    feedbackName: '',
    feedbackEmail: '',
    rating: 0,
    feedbackType: '',
    feedbackMessage: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = e => {
    setFeedbackForm({ ...feedbackForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5050/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
    setSubmitted(true);
        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setError(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async e => {
    e.preventDefault();
    setFeedbackLoading(true);
    setFeedbackError('');

    try {
      const response = await fetch('http://localhost:5050/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: feedbackForm.feedbackName,
          email: feedbackForm.feedbackEmail,
          rating: feedbackForm.rating,
          serviceType: feedbackForm.feedbackType,
          message: feedbackForm.feedbackMessage
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFeedbackSubmitted(true);
        setFeedbackForm({
          feedbackName: '',
          feedbackEmail: '',
          rating: 0,
          feedbackType: '',
          feedbackMessage: ''
        });
      } else {
        setFeedbackError(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setFeedbackError('Failed to submit feedback. Please try again.');
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handlePhoneClick = (phoneNumber, phoneType) => {
    setSelectedPhone({ number: phoneNumber, type: phoneType });
    setShowPhonePopup(true);
  };

  const handleCallConfirm = () => {
    window.open(`tel:${selectedPhone.number}`, '_self');
    setShowPhonePopup(false);
  };

  const handleCallCancel = () => {
    setShowPhonePopup(false);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-hero-badge">Get In Touch</div>
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            Have questions about our photography services? We're here to help!
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="contact-cards-section">
        <div className="contact-cards-container">
          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3 className="contact-card-title">Our Location</h3>
            <div className="contact-card-content">
              <p>123/kandy</p>
              <p>Srilanka.20080</p>
            </div>
            <a href="https://maps.google.com/?q=123/kandy,Srilanka,20080" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="contact-card-link">
              Get Directions
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fas fa-phone"></i>
            </div>
            <h3 className="contact-card-title">Phone Number</h3>
            <div className="contact-card-content">
              <p>Main: 081-1234567</p>
              <p>Support: 0771234562</p>
            </div>
            <button 
              onClick={() => handlePhoneClick('081-1234567', 'Main')}
              className="contact-card-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'center' }}
            >
              Call Us
            </button>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="contact-card-title">Email Address</h3>
            <div className="contact-card-content">
              <p>globalimage@gmail.com</p>
              <p>suppglobalimage@gmail.com</p>
            </div>
            <a href="mailto:globalimage@gmail.com" className="contact-card-link">
              Send Email
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="contact-card-title">Business Hours</h3>
            <div className="contact-card-content">
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 10am - 4pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="contact-main-section">
        <div className="contact-main-container">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="contact-form-badge">Send Us a Message</div>
            <h2 className="contact-form-title">Get in Touch</h2>
            <p className="contact-form-desc">
              Have questions about our services or want to book a photography session? 
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            {submitted ? (
              <div className="contact-success">
                Thank you for your message! We'll be in touch soon.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && (
                  <div className="contact-error">
                    {error}
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@gmail.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="001-1234567"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Photography Inquiry"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry or project"
                    rows={5}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Map Section */}
          <div className="contact-map-section">
            <div className="contact-map-badge">Our Location</div>
            <h2 className="contact-map-title">Find Us Here</h2>
            <p className="contact-map-desc">
              Visit our studio or contact us through any of the provided channels. 
              We look forward to hearing from you!
            </p>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162535016!2d80.571365!3d7.290572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x6a5c5a3c5c5c5c5c!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="contact-faq-section">
        <div className="contact-faq-container">
          <div className="contact-faq-badge">Questions & Answers</div>
          <h2 className="contact-faq-title">Frequently Asked Questions</h2>
          <p className="contact-faq-subtitle">
            Find answers to common questions about our photography services
          </p>
          
          <div className="contact-faq-grid">
            <div className="contact-faq-item">
              <h3 className="contact-faq-question">How far in advance should I book your services?</h3>
              <p className="contact-faq-answer">
                We recommend booking at least 4-8 weeks in advance for corporate events and 2-3 months for graduation ceremonies. For urgent requests, please contact us directly to check our availability.
              </p>
            </div>

            <div className="contact-faq-item">
              <h3 className="contact-faq-question">What is your payment policy?</h3>
              <p className="contact-faq-answer">
                We require a 50% deposit to secure your booking date, with the remaining balance due on or before the event date. We accept credit cards, bank transfers, and checks.
              </p>
            </div>

            <div className="contact-faq-item">
              <h3 className="contact-faq-question">How long does it take to receive the photos?</h3>
              <p className="contact-faq-answer">
                Our standard delivery time is 7-10 business days after the event. We also offer express delivery options for an additional fee, with turnaround times as quick as 48 hours.
              </p>
            </div>

            <div className="contact-faq-item">
              <h3 className="contact-faq-question">Do you provide raw, unedited photos?</h3>
              <p className="contact-faq-answer">
                Our standard packages include professionally edited photos. Raw, unedited files are available as an service for clients who require them for specific purposes.
              </p>
            </div>

            <div className="contact-faq-item">
              <h3 className="contact-faq-question">What happens if there's bad weather for an outdoor event?</h3>
              <p className="contact-faq-answer">
                We monitor weather conditions closely and will work with you to develop contingency plans. If rescheduling is necessary, we'll do our best to accommodate your new date without additional fees.
              </p>
            </div>

            <div className="contact-faq-item">
              <h3 className="contact-faq-question">Do you travel for events outside your city?</h3>
              <p className="contact-faq-answer">
                Yes, we are available for travel nationwide and Internationally. Travel fees apply based on location and are quoted on a case-by-case basis.
              </p>
            </div>
          </div>

          <div className="contact-faq-footer">
            <p>Don't see your question here? Contact us directly and we'll be happy to help.</p>
            <a href="mailto:globalimage@gmail.com" className="contact-faq-email">
              <i className="fas fa-envelope"></i>
              globalimage@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Feedback Section */}
      <div className="feedback-section">
        <div className="feedback-container">
          <div className="feedback-header">
            <div className="feedback-badge">Share Your Experience</div>
            <h2 className="feedback-title">We'd Love to Hear From You</h2>
            <p className="feedback-subtitle">
              Your feedback helps us improve and serve you better. Share your thoughts about our photography services.
            </p>
          </div>

          <div className="feedback-content">
            <div className="feedback-form-container">
              <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                <div className="feedback-form-header">
                  <h3>Rate Your Experience</h3>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                          className={`star-btn ${star <= (feedbackForm.rating || 0) ? 'active' : ''}`}
                          onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                  </div>
                </div>

                  {feedbackError && (
                    <div className="feedback-error">
                      {feedbackError}
                    </div>
                  )}

                <div className="feedback-form-row">
                  <div className="feedback-form-group">
                    <label htmlFor="feedbackName">Your Name</label>
                    <input
                      type="text"
                      id="feedbackName"
                      name="feedbackName"
                      value={feedbackForm.feedbackName || ''}
                      onChange={handleFeedbackChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="feedback-form-group">
                    <label htmlFor="feedbackEmail">Email Address</label>
                    <input
                      type="email"
                      id="feedbackEmail"
                      name="feedbackEmail"
                      value={feedbackForm.feedbackEmail || ''}
                      onChange={handleFeedbackChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="feedback-form-group">
                  <label htmlFor="feedbackType">Service Type</label>
                  <select
                    id="feedbackType"
                    name="feedbackType"
                    value={feedbackForm.feedbackType || ''}
                    onChange={handleFeedbackChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="corporate">Corporate Events</option>
                    <option value="graduation">Graduation Ceremonies</option>
                    <option value="portrait">Portrait Sessions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="feedback-form-group">
                  <label htmlFor="feedbackMessage">Your Feedback</label>
                  <textarea
                    id="feedbackMessage"
                    name="feedbackMessage"
                    value={feedbackForm.feedbackMessage || ''}
                    onChange={handleFeedbackChange}
                    placeholder="Tell us about your experience with our photography services..."
                    rows={4}
                    required
                  />
                </div>

                <div className="feedback-submit-container">
                  <button type="submit" className="feedback-submit-btn" disabled={feedbackLoading}>
                    <span className="btn-text">
                      {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
                    </span>
                    <span className="btn-icon">
                      <i className="fas fa-paper-plane"></i>
                    </span>
                  </button>
                </div>
              </form>

              {feedbackSubmitted && (
                <div className="feedback-success">
                  Thank you for your feedback! We appreciate your input.
                </div>
              )}
            </div>

            <div className="feedback-stats">
              <div className="stats-header">
                <h3>What Our Clients Say</h3>
                <p>Real feedback from satisfied customers</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-camera"></i>
                  </div>
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Events Captured</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
              </div>

              <div className="feedback-quotes">
                <div className="quote-card">
                  <div className="quote-text">
                    "Amazing photography service! They captured our wedding perfectly. Highly recommended!"
                  </div>
                  <div className="quote-author">- Sarah & John</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Call Popup */}
      {showPhonePopup && (
        <div className="phone-popup-overlay" onClick={handleCallCancel}>
          <div className="phone-popup" onClick={(e) => e.stopPropagation()}>
            <div className="phone-popup-header">
              <h3>Make a Call</h3>
              <button 
                className="phone-popup-close"
                onClick={handleCallCancel}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="phone-popup-content">
              <div className="phone-popup-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h4>Call {selectedPhone.type} Number</h4>
              <p className="phone-popup-number">{selectedPhone.number}</p>
              <p className="phone-popup-desc">
                Would you like to call this number now?
              </p>
            </div>
            <div className="phone-popup-actions">
              <button 
                className="phone-popup-cancel"
                onClick={handleCallCancel}
              >
                Cancel
              </button>
              <button 
                className="phone-popup-call"
                onClick={handleCallConfirm}
              >
                <i className="fas fa-phone"></i>
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact; 