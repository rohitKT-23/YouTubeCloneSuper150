import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from '../utils/dateUtils';
import { formatViewCount } from '../utils/formatUtils';
import PropTypes from 'prop-types';

const VideoCard = ({ video }) => {
  // Add safety checks for undefined video or missing properties
  if (!video) {
    return (
      <div className="video-card animate-pulse">
        <div className="relative pb-[56.25%] bg-gray-200 rounded-xl"></div>
        <div className="flex mt-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          <div className="ml-3 flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Safe defaults for potentially missing data
  const safeVideo = {
    ...video,
    channel: {
      _id: video.channel?._id || 'unknown',
      name: video.channel?.name || 'Unknown Channel',
      avatar: video.channel?.avatar,
    },
    thumbnail: video.thumbnail || '/default-thumbnail.jpg',
    title: video.title || 'Untitled Video',
    views: video.views || 0,
    uploadDate: video.uploadDate || new Date().toISOString(),
  };

  const formattedDate = formatDistanceToNow(new Date(safeVideo.uploadDate));
  const formattedViews = formatViewCount(safeVideo.views);
  const channelInitial = safeVideo.channel.name.charAt(0).toUpperCase();

  return (
    <div className="video-card hover:scale-[1.02] transition-transform duration-200">
      <Link to={`/video/${safeVideo._id}`} className="block">
        <div className="relative pb-[56.25%] overflow-hidden rounded-xl bg-gray-100 group">
          <img 
            src={safeVideo.thumbnail} 
            alt={safeVideo.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-thumbnail.jpg';
            }}
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
            {formattedDate}
          </div>
        </div>
      </Link>
      <div className="flex mt-3">
        <div className="flex-shrink-0 mr-3">
          <Link to={`/channel/${safeVideo.channel._id}`}>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={safeVideo.channel.avatar || `https://ui-avatars.com/api/?name=${channelInitial}&background=random`} 
                alt={safeVideo.channel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${channelInitial}&background=random`;
                }}
              />
            </div>
          </Link>
        </div>
        <div className="min-w-0">
          <Link to={`/video/${safeVideo._id}`} className="block">
            <h3 className="font-medium text-sm line-clamp-2 hover:text-blue-600 transition-colors">
              {safeVideo.title}
            </h3>
          </Link>
          <Link to={`/channel/${safeVideo.channel._id}`} className="block">
            <p className="text-gray-600 text-sm mt-1 hover:text-black transition-colors">
              {safeVideo.channel.name}
            </p>
          </Link>
          <p className="text-gray-600 text-sm">
            {formattedViews} • {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    views: PropTypes.number,
    uploadDate: PropTypes.string,
    channel: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  })
};

export default VideoCard;