import { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import FilterButtons from '../components/FilterButtons';
import Sidebar from '../components/Sidebar';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
        
        // For demo purposes, generate some sample videos if API call fails
        const sampleVideos = Array(12).fill().map((_, index) => ({
          videoId: `sample-${index}`,
          title: `Sample Video ${index + 1} - Learn ${selected !== 'All' ? selected : 'Web Development'} with this comprehensive tutorial`,
          uploader: `Creator${index + 1}`,
          views: Math.floor(Math.random() * 1000000),
          thumbnailURL: `https://picsum.photos/seed/${index}/640/360`,
          uploadDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
          duration: Math.floor(Math.random() * 600) + 120, // 2-12 minutes
        }));
        setVideos(sampleVideos);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  const filteredVideos =
    selected === 'All'
      ? videos
      : videos.filter((video) =>
          video.title.toLowerCase().includes(selected.toLowerCase())
        );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow md:ml-64">
        <FilterButtons selected={selected} setSelected={setSelected} />
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={32} className="animate-spin text-gray-600 dark:text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Loading videos...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-[1800px] mx-auto">
            {filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;