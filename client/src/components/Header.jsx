import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User, Video, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import PropTypes from 'prop-types';

const Header = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 h-16 px-4 flex items-center justify-between border-b border-gray-200">
      {showMobileSearch ? (
        <div className="flex items-center w-full">
          <button 
            onClick={() => setShowMobileSearch(false)}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
          <form onSubmit={handleSearch} className="flex-1 flex">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 hover:bg-gray-200"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="mr-2 p-2 rounded-full hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-1">
              <Logo />
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-4 hover:bg-gray-200"
            >
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <Search size={24} />
            </button>
            {user ? (
              <>
                <button className="p-2 rounded-full hover:bg-gray-100 hidden sm:block">
                  <Video size={24} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 hidden sm:block">
                  <Bell size={24} />
                </button>
                <div className="relative group">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white hover:bg-purple-600">
                    {user.username.charAt(0).toUpperCase()}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block border border-gray-200 z-10">
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1 border border-gray-300 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
              >
                <User size={18} />
                <span>Sign in</span>
              </Link>
            )}
          </div>
        </>
      )}
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};

export default Header;