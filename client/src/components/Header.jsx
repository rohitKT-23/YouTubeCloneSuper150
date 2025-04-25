import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, Search, Bell, Upload, Moon, Sun } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 transition-all duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-14">
          {/* Left section: Logo and menu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} className="text-gray-700 dark:text-gray-200" />
            </button>
            
            <Link to="/" className="flex items-center gap-1">
              <div className="bg-red-600 text-white p-1 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991226 9.97631 1 11.75C0.988537 13.537 1.14253 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0115 9.96295 22.8574 8.1787 22.54 6.42Z" fill="currentColor"/>
                  <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" fill="white"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">YouTube</span>
            </Link>
          </div>
          
          {/* Middle section: Search */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xl mx-6"
          >
            <div className="relative flex flex-1">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-l-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <button 
                type="submit" 
                className="px-5 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Search size={20} className="text-gray-600 dark:text-gray-200" />
              </button>
            </div>
          </form>
          
          {/* Right section: User actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-gray-200" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
            
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Search"
              onClick={() => navigate('/search')}
            >
              <Search size={20} className="text-gray-700 dark:text-gray-200" />
            </button>
            
            {user ? (
              <>
                <button 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell size={20} className="text-gray-700 dark:text-gray-200" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
                </button>
                
                <button 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Upload"
                >
                  <Upload size={20} className="text-gray-700 dark:text-gray-200" />
                </button>
                
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <img 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Your channel
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Settings
                      </a>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-3 py-1.5 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile search - only visible on small screens */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full"
          >
            <Search size={20} className="text-gray-600 dark:text-gray-200" />
          </button>
        </form>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <div 
            className="h-full w-64 bg-white dark:bg-gray-900 p-4 transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="flex items-center gap-1">
                <div className="bg-red-600 text-white p-1 rounded">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991226 9.97631 1 11.75C0.988537 13.537 1.14253 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0115 9.96295 22.8574 8.1787 22.54 6.42Z" fill="currentColor"/>
                    <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" fill="white"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">YouTube</span>
              </Link>
            </div>
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      location.pathname === '/' ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 18C17 16.9391 16.5786 15.9217 15.8284 15.1716C15.0783 14.4214 14.0609 14 13 14H5C3.93913 14 2.92172 14.4214 2.17157 15.1716C1.42143 15.9217 1 16.9391 1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 18C23 16.9391 22.5786 15.9217 21.8284 15.1716C21.0783 14.4214 20.0609 14 19 14H18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 11C19.2091 11 21 9.20914 21 7C21 4.79086 19.2091 3 17 3C14.7909 3 13 4.79086 13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Subscriptions</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Library</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Your videos</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;