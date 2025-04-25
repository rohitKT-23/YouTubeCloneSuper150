import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import SearchResults from './pages/SearchResults';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();
  const { loading } = useAuth();
  
  useEffect(() => {
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 overflow-y-auto pt-16 ${showSidebar ? 'ml-0 md:ml-64' : 'ml-0'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add-comment" element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;