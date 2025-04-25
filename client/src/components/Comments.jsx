import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { MessageSquare, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';

const Comments = ({ videoId, comments, setComments }) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [showComments, setShowComments] = useState(true);
  const commentInputRef = useRef(null);

  useEffect(() => {
    setCommentCount(comments.length);
  }, [comments]);

  const focusCommentInput = () => {
    if (commentInputRef.current && user) {
      commentInputRef.current.focus();
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/videos/${videoId}/comment`, {
        text,
        userId: user.userId,
      });
      
      setComments(prev => [res.data, ...prev]);
      setText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 rounded-lg">
      <div className="mb-4">
        <button 
          onClick={toggleComments}
          className="flex items-center gap-2 font-medium text-lg"
        >
          <span>{commentCount} Comments</span>
          <span className={`transition-transform ${showComments ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>
      
      {showComments && (
        <>
          {user ? (
            <form onSubmit={addComment} className="flex gap-3 mb-6">
              <div className="flex-shrink-0">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <input
                  ref={commentInputRef}
                  type="text"
                  className="w-full border-b border-gray-300 dark:border-gray-700 py-2 px-1 bg-transparent focus:outline-none focus:border-blue-500 dark:text-white"
                  placeholder="Add a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    type="button"
                    onClick={() => setText('')}
                    className="px-3 py-1.5 text-sm bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!text.trim() || isSubmitting}
                    className={`px-3 py-1.5 text-sm bg-blue-600 text-white rounded-full ${
                      !text.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'Posting...' : 'Comment'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <MessageSquare size={24} className="text-gray-400" />
              <div>
                <p className="font-medium">Join the conversation</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign in to comment on this video
                </p>
              </div>
              <Link
                to="/login"
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
              >
                Sign in
              </Link>
            </div>
          )}
          
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.commentId} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={`https://ui-avatars.com/api/?name=User&background=random`}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">@user{comment.userId.slice(-4)}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                        <ThumbsUp size={16} />
                        <span className="text-xs">{comment.likes || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                        <ThumbsDown size={16} />
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                        Reply
                      </button>
                    </div>
                  </div>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;