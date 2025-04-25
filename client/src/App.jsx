import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPage from './pages/VideoPage';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  // Update title
  useEffect(() => {
    document.title = 'YouTube Clone';
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
          <Header />
          <div className="pt-16"> {/* Adjust for fixed header */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/video/:videoId" element={<VideoPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/trending" element={<Home />} /> {/* Placeholder */}
              <Route path="/subscriptions" element={<Home />} /> {/* Placeholder */}
              <Route path="/library" element={<Home />} /> {/* Placeholder */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;