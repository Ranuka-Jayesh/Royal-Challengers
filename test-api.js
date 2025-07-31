const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAPI() {
  try {
    // Test contact submission
    const contactData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "Test message"
    };

    console.log('Testing contact submission...');
    const contactResponse = await fetch('http://localhost:5050/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const contactResult = await contactResponse.json();
    console.log('Contact submission result:', contactResult);

    // Test feedback submission
    const feedbackData = {
      name: "Test User",
      email: "test@example.com",
      rating: 5,
      serviceType: "wedding",
      message: "Great service!"
    };

    console.log('\nTesting feedback submission...');
    const feedbackResponse = await fetch('http://localhost:5050/api/feedback/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    const feedbackResult = await feedbackResponse.json();
    console.log('Feedback submission result:', feedbackResult);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAPI(); 