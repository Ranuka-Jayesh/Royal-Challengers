import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import Services from './pages/Services';
import EventGallery from './pages/EventGallery';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio/event" element={<EventGallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          {/* Add more routes here for other pages */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
