import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { fetchComments } from '../services/commentService';

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await fetchComments(videoId);
      setComments(data);
      setError('');
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const handleCommentAction = () => {
    loadComments();
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-medium mb-4">{comments.length} Comments</h3>
      
      <CommentForm videoId={videoId} onCommentAdded={handleCommentAction} />
      
      {loading ? (
        <div className="space-y-4 mt-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={loadComments}
            className="mt-2 text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                videoId={videoId}
                onCommentUpdated={handleCommentAction}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

CommentList.propTypes = {
  videoId: PropTypes.string.isRequired
};

export default CommentList;