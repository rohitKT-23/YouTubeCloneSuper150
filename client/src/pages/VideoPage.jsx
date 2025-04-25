import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVideoById } from '../services/videoService';
import VideoPlayer from '../components/VideoPlayer';
import CommentList from '../components/CommentList';
import { ThumbsUp, ThumbsDown, Share2, Download, Save, MoreHorizontal, Check } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';
import { formatViewCount } from '../utils/formatUtils';
import { likeVideo, dislikeVideo } from '../services/videoService';
import { useAuth } from '../context/AuthContext';

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    const loadVideo = async () => {
      if (!videoId) {
        setError('No video ID provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await fetchVideoById(videoId);
        if (!data) {
          throw new Error('Video data not found');
        }
        setVideo(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load video');
        console.error('Video loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId]);

  const handleLike = async () => {
    if (!videoId || !isAuthenticated) return;
    
    try {
      const updatedVideo = await likeVideo(videoId);
      setVideo(prev => ({
        ...prev,
        ...updatedVideo,
        // Ensure channel data is preserved
        channel: prev.channel 
      }));
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async () => {
    if (!videoId || !isAuthenticated) return;
    
    try {
      const updatedVideo = await dislikeVideo(videoId);
      setVideo(prev => ({
        ...prev,
        ...updatedVideo,
        // Ensure channel data is preserved
        channel: prev.channel
      }));
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
        <div className="animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
          <div className="h-24 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">{error || 'Video not found'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Safe data access with fallbacks
  const safeVideo = {
    ...video,
    title: video.title || 'Untitled Video',
    description: video.description || '',
    channel: {
      ...video.channel,
      name: video.channel?.name || 'Unknown Channel',
      avatar: video.channel?.avatar || `https://ui-avatars.com/api/?name=${video.channel?.name?.charAt(0) || 'U'}&background=random`,
      subscribers: video.channel?.subscribers || 0
    },
    likes: video.likes || 0,
    dislikes: video.dislikes || 0,
    uploadDate: video.uploadDate || new Date().toISOString(),
    views: video.views || 0
  };

  const formattedDate = formatDistanceToNow(new Date(safeVideo.uploadDate));
  const formattedViews = formatViewCount(safeVideo.views);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
      <VideoPlayer 
        videoUrl={safeVideo.videoUrl} 
        thumbnailUrl={safeVideo.thumbnail} 
      />
      
      <div className="mt-4">
        <h1 className="text-xl font-medium mb-2">{safeVideo.title}</h1>
        
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <Link 
              to={`/channel/${safeVideo.channel._id}`} 
              className="flex items-center gap-3 hover:opacity-90"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={safeVideo.channel.avatar}
                  alt={safeVideo.channel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${safeVideo.channel.name.charAt(0)}&background=random`;
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium">{safeVideo.channel.name}</h3>
                <p className="text-sm text-gray-600">
                  {formatViewCount(safeVideo.channel.subscribers)} subscribers
                </p>
              </div>
            </Link>
            
            <button
              onClick={toggleSubscription}
              className={`ml-4 px-4 py-2 rounded-full font-medium transition-colors ${
                isSubscribed 
                  ? 'bg-gray-200 hover:bg-gray-300 flex items-center gap-1' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              disabled={!isAuthenticated}
            >
              {isSubscribed ? (
                <>
                  <Check size={16} />
                  Subscribed
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full bg-gray-100 overflow-hidden divide-x divide-gray-300">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 px-4 py-2 hover:bg-gray-200 ${
                  safeVideo.userLiked ? 'text-blue-600' : ''
                }`}
                disabled={!isAuthenticated}
              >
                <ThumbsUp size={18} />
                <span>{formatViewCount(safeVideo.likes)}</span>
              </button>
              <button 
                onClick={handleDislike}
                className={`flex items-center gap-1 px-4 py-2 hover:bg-gray-200 ${
                  safeVideo.userDisliked ? 'text-blue-600' : ''
                }`}
                disabled={!isAuthenticated}
              >
                <ThumbsDown size={18} />
                <span>{formatViewCount(safeVideo.dislikes)}</span>
              </button>
            </div>
            
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>
            
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Download size={18} />
              <span className="hidden sm:inline">Download</span>
            </button>
            
            <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Save size={18} />
              <span className="hidden sm:inline">Save</span>
            </button>
            
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
        
        <div 
          className={`bg-gray-100 rounded-lg p-3 mb-6 transition-all ${
            showDescription ? '' : 'max-h-24 overflow-hidden'
          }`}
        >
          <div className="flex items-center gap-2 font-medium mb-1">
            <span>{formattedViews} views</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
          <p className="whitespace-pre-line mb-2">{safeVideo.description}</p>
          
          {(safeVideo.description?.length > 100) && (
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="font-medium text-sm text-blue-600 hover:text-blue-800"
            >
              {showDescription ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        {videoId && <CommentList videoId={videoId} />}
      </div>
    </div>
  );
};

export default VideoPage;