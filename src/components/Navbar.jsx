import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-yellow-300">Faith</span>Connect
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={`hover:text-yellow-200 transition-all duration-300 ${isActive('/') ? 'font-bold border-b-2 border-yellow-300' : ''}`}>Home</Link>
          <Link to="/events" className={`hover:text-yellow-200 transition-all duration-300 ${isActive('/events') ? 'font-bold border-b-2 border-yellow-300' : ''}`}>Events</Link>
          <Link to="/about" className={`hover:text-yellow-200 transition-all duration-300 ${isActive('/about') ? 'font-bold border-b-2 border-yellow-300' : ''}`}>About Us</Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-blue-600 rounded-md p-2 animate-fadeIn">
          <Link to="/" className="block py-2 px-4 hover:bg-blue-700 rounded transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/events" className="block py-2 px-4 hover:bg-blue-700 rounded transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Events</Link>
          <Link to="/about" className="block py-2 px-4 hover:bg-blue-700 rounded transition-all duration-200" onClick={() => setIsMenuOpen(false)}>About Us</Link>
        </div>
      )}
    </nav>
  );
}
