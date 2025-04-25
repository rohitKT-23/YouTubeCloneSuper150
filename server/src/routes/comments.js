import express from 'express';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { authenticateToken, optionalAuthenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get comments for a video
router.get('/:videoId', async (req, res, next) => {
  try {
    const { videoId } = req.params;
    
    // Verify that the video exists
    const videoExists = await Video.exists({ _id: videoId });
    if (!videoExists) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Get top-level comments only (no replies)
    const comments = await Comment.find({ 
      videoId,
      parentId: null
    })
    .sort({ createdAt: -1 })
    .populate({
      path: 'userId',
      select: 'username avatar',
      model: 'User'
    });
    
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

// Add a comment
router.post('/:videoId', authenticateToken, async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { text, parentId } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    // Verify that the video exists
    const videoExists = await Video.exists({ _id: videoId });
    if (!videoExists) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // If parentId is provided, verify that the parent comment exists
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }
    
    // Create and save new comment
    const comment = new Comment({
      videoId,
      userId: req.user.id,
      text,
      parentId: parentId || null
    });
    
    await comment.save();
    
    // Populate user info
    await comment.populate({
      path: 'userId',
      select: 'username avatar',
      model: 'User'
    });
    
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// Update a comment
router.put('/:videoId/:commentId', authenticateToken, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    // Find the comment
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is the comment owner
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }
    
    // Update the comment
    comment.text = text;
    await comment.save();
    
    // Populate user info
    await comment.populate({
      path: 'userId',
      select: 'username avatar',
      model: 'User'
    });
    
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// Delete a comment
router.delete('/:videoId/:commentId', authenticateToken, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    
    // Find the comment
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is the comment owner or an admin
    if (comment.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    
    // Delete the comment
    await Comment.findByIdAndDelete(commentId);
    
    // Also delete any replies to this comment
    await Comment.deleteMany({ parentId: commentId });
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Like a comment
router.post('/:videoId/:commentId/like', authenticateToken, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    const userId = req.user.id;
    const isLiked = comment.likedBy.includes(userId);
    const isDisliked = comment.dislikedBy.includes(userId);
    
    if (isLiked) {
      // User already liked, so unlike
      comment.likedBy = comment.likedBy.filter(id => id.toString() !== userId);
      comment.likes -= 1;
    } else {
      // Add like
      comment.likedBy.push(userId);
      comment.likes += 1;
      
      // Remove dislike if exists
      if (isDisliked) {
        comment.dislikedBy = comment.dislikedBy.filter(id => id.toString() !== userId);
        comment.dislikes -= 1;
      }
    }
    
    await comment.save();
    
    res.json({
      _id: comment._id,
      likes: comment.likes,
      dislikes: comment.dislikes,
      isLiked: comment.likedBy.includes(userId),
      isDisliked: comment.dislikedBy.includes(userId)
    });
  } catch (error) {
    next(error);
  }
});

// Dislike a comment
router.post('/:videoId/:commentId/dislike', authenticateToken, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    const userId = req.user.id;
    const isLiked = comment.likedBy.includes(userId);
    const isDisliked = comment.dislikedBy.includes(userId);
    
    if (isDisliked) {
      // User already disliked, so remove dislike
      comment.dislikedBy = comment.dislikedBy.filter(id => id.toString() !== userId);
      comment.dislikes -= 1;
    } else {
      // Add dislike
      comment.dislikedBy.push(userId);
      comment.dislikes += 1;
      
      // Remove like if exists
      if (isLiked) {
        comment.likedBy = comment.likedBy.filter(id => id.toString() !== userId);
        comment.likes -= 1;
      }
    }
    
    await comment.save();
    
    res.json({
      _id: comment._id,
      likes: comment.likes,
      dislikes: comment.dislikes,
      isLiked: comment.likedBy.includes(userId),
      isDisliked: comment.dislikedBy.includes(userId)
    });
  } catch (error) {
    next(error);
  }
});

export default router;