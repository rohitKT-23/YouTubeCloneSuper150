import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import VideoCard from '../components/VideoCard';
import { ThumbsUp, ThumbsDown, Share, Save, Flag } from 'lucide-react';
import axios from 'axios';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch video data from backend
        const videoRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/${videoId}`);
        setVideo(videoRes.data);

        // Fetch comments for the video
        const commentsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/${videoId}/comments`);
        setComments(commentsRes.data);

        // Fetch related videos
        const relatedVideosRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/videos/related`);
        setRelatedVideos(relatedVideosRes.data);
        
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [videoId]);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading video...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Video not found</h2>
          <p className="text-gray-600">The video you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-[1800px] mx-auto">
      <div className="flex-grow lg:w-3/4">
        {/* Video Player */}
        <div className="mb-4">
          <VideoPlayer src={video.videoURL} />
        </div>
        
        {/* Video Info */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-2">{video.title}</h1>
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{video.views} views</span>
              <span>•</span>
              <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike} 
                className={`flex items-center gap-1 ${liked ? 'text-blue-600' : 'text-gray-700'}`}
              >
                <ThumbsUp size={20} />
                <span>{video.likes || 0}</span>
              </button>
              <button 
                onClick={handleDislike} 
                className={`flex items-center gap-1 ${disliked ? 'text-blue-600' : 'text-gray-700'}`}
              >
                <ThumbsDown size={20} />
              </button>
              <button className="flex items-center gap-1 text-gray-700">
                <Share size={20} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-1 text-gray-700">
                <Save size={20} />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button className="flex items-center gap-1 text-gray-700">
                <Flag size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Channel Info */}
        <div className="flex items-start gap-4 p-4 border-t border-b mb-6">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.uploader)}&background=random`} 
            alt={video.uploader} 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium">{video.uploader}</h3>
            <p className="text-sm text-gray-600">Subscribers: {video.subscriberCount}</p>
          </div>
        </div>
        
        {/* Comments Section */}
        <Comments comments={comments} />
        
      </div>

      {/* Related Videos */}
      <div className="lg:w-1/4">
        <h3 className="font-medium text-xl mb-4">Related Videos</h3>
        {relatedVideos.map((relatedVideo) => (
          <VideoCard key={relatedVideo.videoId} video={relatedVideo} />
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
