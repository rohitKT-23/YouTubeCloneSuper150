import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../services/videoService';
import VideoCard from '../components/VideoCard';


const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const results = await searchVideos(query);
        setVideos(results);
        setError('');
      } catch (err) {
        setError('Failed to load search results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="p-4 pt-6">
        <h2 className="text-lg mb-4">Searching for "{query}"...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex gap-4 animate-pulse">
              <div className="w-40 h-24 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 pt-6">
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pt-6">
      <h2 className="text-lg font-medium mb-4">
        {videos.length > 0 
          ? `Search results for "${query}"`
          : `No results found for "${query}"`
        }
      </h2>
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {videos.map((video) => (
            <div key={video._id} className="flex md:gap-4 flex-col md:flex-row">
              <div className="md:w-64 md:h-36 mb-2 md:mb-0">
                <div className="relative pb-[56.25%] md:pb-0 md:h-full overflow-hidden rounded-xl bg-gray-100">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{video.title}</h3>
                <p className="text-gray-600 text-sm">
                  {video.views} views • {new Date(video.uploadDate).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2 my-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img 
                      src={video.channel.avatar} 
                      alt={video.channel.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <p className="text-gray-600 text-sm">{video.channel.name}</p>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Try different keywords or check for spelling errors</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;