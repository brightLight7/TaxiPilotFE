import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RegisterLogin from './pages/RegisterLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration-login" element={<RegisterLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-page" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
