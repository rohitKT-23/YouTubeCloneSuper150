import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from '../utils/dateUtils';
import { formatViewCount } from '../utils/formatUtils';
import PropTypes from 'prop-types';

const VideoCard = ({ video }) => {
  const formattedDate = formatDistanceToNow(new Date(video.uploadDate));
  const formattedViews = formatViewCount(video.views);

  return (
    <div className="video-card hover:scale-[1.02] transition-transform duration-200">
      <Link to={`/video/${video._id}`} className="block">
        <div className="relative pb-[56.25%] overflow-hidden rounded-xl bg-gray-100 group">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
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
          <Link to={`/channel/${video.channel._id}`}>
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <img 
                src={video.channel.avatar || `https://ui-avatars.com/api/?name=${video.channel.name.charAt(0)}&background=random`} 
                alt={video.channel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${video.channel.name.charAt(0)}&background=random`;
                }}
              />
            </div>
          </Link>
        </div>
        <div className="min-w-0">
          <Link to={`/video/${video._id}`} className="block">
            <h3 className="font-medium text-sm line-clamp-2 hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
          </Link>
          <Link to={`/channel/${video.channel._id}`} className="block">
            <p className="text-gray-600 text-sm mt-1 hover:text-black transition-colors">
              {video.channel.name}
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
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    uploadDate: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    }).isRequired
  }).isRequired
};

export default VideoCard;