import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addComment } from '../services/commentService';

const CommentForm = ({ videoId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/video/${videoId}` } });
      return;
    }
    
    if (!comment.trim()) return;
    
    try {
      setIsSubmitting(true);
      await addComment(videoId, comment);
      setComment('');
      onCommentAdded();
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvatarUrl = () => {
    if (!isAuthenticated || !user) return null;
    return user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`;
  };

  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {isAuthenticated ? (
            <img
              src={getAvatarUrl()}
              alt={user?.username}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'U')}&background=random`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">?</span>
            </div>
          )}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          type="text"
          placeholder={isAuthenticated ? "Add a comment..." : "Sign in to comment"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          disabled={!isAuthenticated || isSubmitting}
        />
        
        {isAuthenticated && comment.trim() && (
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setComment('')}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Commenting...' : 'Comment'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentForm;