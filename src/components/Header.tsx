import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, LogOut, Menu, X, Home, ClipboardList } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const header = document.getElementById('main-header');
      if (header) {
        header.style.setProperty('--mouse-x', `${e.clientX}px`);
        header.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header id="main-header" className="relative bg-dark-900 border-b border-dark-800">
      <div className="absolute inset-0 spotlight-effect"></div>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary-500" />
            <span className="text-xl font-bold text-white">BookingHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-100 hover:text-primary-400 font-medium">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-dark-100 hover:text-primary-400 font-medium">
                  My Bookings
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-dark-100 hover:text-primary-400 font-medium">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-dark-200 font-medium">{user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 rounded-md bg-dark-800 text-dark-100 hover:bg-dark-700 flex items-center border border-dark-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm px-4 py-2 rounded-md bg-dark-800 text-dark-100 hover:bg-dark-700 border border-dark-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          <button 
            className="md:hidden text-dark-100 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-dark-800">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center text-dark-100 hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center text-dark-100 hover:text-primary-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ClipboardList className="h-5 w-5 mr-2" />
                      My Bookings
                    </Link>
                  </li>
                  {user.isAdmin && (
                    <li>
                      <Link 
                        to="/admin" 
                        className="flex items-center text-dark-100 hover:text-primary-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className="pt-2 border-t border-dark-700">
                    <div className="text-dark-200 font-medium">{user.name}</div>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center text-red-400 hover:text-red-300"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-center rounded-md bg-dark-800 text-dark-100 hover:bg-dark-700 border border-dark-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="block px-4 py-2 text-center rounded-md bg-primary-600 text-white hover:bg-primary-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;