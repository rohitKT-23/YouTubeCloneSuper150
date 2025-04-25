import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Filter, Search, Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('relevance');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setVideos([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/search?q=${encodeURIComponent(query)}`);
        setVideos(res.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again later.');
        
        // For demo purposes, generate some sample videos if API call fails
        const sampleVideos = Array(8).fill().map((_, index) => ({
          videoId: `search-${index}`,
          title: `${query} Tutorial ${index + 1} - Complete Guide for Beginners`,
          uploader: `${query}Expert${index + 1}`,
          views: Math.floor(Math.random() * 500000),
          thumbnailURL: `https://picsum.photos/seed/search${index}/640/360`,
          uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          duration: Math.floor(Math.random() * 900) + 300, // 5-20 minutes
          description: `Learn everything about ${query} in this comprehensive tutorial. Perfect for beginners and intermediate learners alike.`
        }));
        setVideos(sampleVideos);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow md:ml-64 px-4 py-6">
        {/* Search header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-gray-600 dark:text-gray-400" />
            <h1 className="text-xl font-medium">
              {query ? `Search results for "${query}"` : 'Search YouTube'}
            </h1>
          </div>
          <button 
            onClick={toggleFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter size={16} />
            <span className="text-sm">Filters</span>
          </button>
        </div>
        
        {/* Filter options */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <h3 className="font-medium mb-3">Sort by</h3>
            <div className="flex flex-wrap gap-2">
              {['relevance', 'upload date', 'view count', 'rating'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                    activeFilter === filter
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search results */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="flex flex-col items-center">
              <Loader2 size={32} className="animate-spin text-gray-600 dark:text-gray-400" />
              <p className="mt-2 text-gray-600 dark:text-gray-400">Searching for "{query}"</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-lg font-medium mb-2">No results found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl">
            {videos.map(video => (
              <Link 
                key={video.videoId} 
                to={`/video/${video.videoId}`}
                className="flex flex-col sm:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
              >
                <div className="relative flex-shrink-0 sm:w-64">
                  <img 
                    src={video.thumbnailURL}
                    alt={video.title}
                    className="w-full rounded-lg aspect-video object-cover"
                  />
                  {video.duration && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                      {formatDuration(video.duration)}
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-medium mb-1 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 space-x-1 mb-2">
                    <span>{formatViews(video.views)}</span>
                    <span>•</span>
                    <span>{formatDate(video.uploadDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.uploader)}&background=random`}
                        alt={video.uploader}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{video.uploader}</span>
                  </div>
                  
                  {video.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;