import express from 'express';
import Video from '../models/Video.js';
import User from '../models/User.js';
import { authenticateToken, optionalAuthenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all videos (with optional category filter)
router.get('/', optionalAuthenticateToken, async (req, res, next) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const query = category ? { category } : {};
    
    const videos = await Video.find(query)
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate({
        path: 'userId',
        select: '_id username avatar subscribers',
        model: 'User'
      });
    
    // Format response
    const formattedVideos = videos.map(video => ({
      _id: video._id,
      title: video.title,
      thumbnail: video.thumbnail,
      views: video.views,
      likes: video.likes,
      dislikes: video.dislikes,
      uploadDate: video.uploadDate,
      channel: {
        _id: video.userId._id,
        name: video.userId.username,
        avatar: video.userId.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(video.userId.username)}&background=random`,
        subscribers: video.userId.subscribers
      }
    }));
    
    res.json(formattedVideos);
  } catch (error) {
    next(error);
  }
});

// Get video by ID
router.get('/:id', optionalAuthenticateToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate({
        path: 'userId',
        select: '_id username avatar subscribers',
        model: 'User'
      });
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Increment view count (could be more sophisticated in a real app)
    video.views += 1;
    await video.save();
    
    // Check if user has liked/disliked the video
    let isLiked = false;
    let isDisliked = false;
    
    if (req.user) {
      isLiked = video.likedBy.includes(req.user.id);
      isDisliked = video.dislikedBy.includes(req.user.id);
    }
    
    const videoResponse = {
      _id: video._id,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      videoUrl: video.videoUrl,
      views: video.views,
      likes: video.likes,
      dislikes: video.dislikes,
      uploadDate: video.uploadDate,
      category: video.category,
      tags: video.tags,
      isLiked,
      isDisliked,
      channel: {
        _id: video.userId._id,
        name: video.userId.username,
        avatar: video.userId.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(video.userId.username)}&background=random`,
        subscribers: video.userId.subscribers
      }
    };
    
    res.json(videoResponse);
  } catch (error) {
    next(error);
  }
});

// Search videos
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Search using text index or regex for more flexible matching
    const videos = await Video.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    })
    .limit(20)
    .populate({
      path: 'userId',
      select: '_id username avatar subscribers',
      model: 'User'
    });
    
    // Format response
    const formattedVideos = videos.map(video => ({
      _id: video._id,
      title: video.title,
      thumbnail: video.thumbnail,
      description: video.description,
      views: video.views,
      uploadDate: video.uploadDate,
      channel: {
        _id: video.userId._id,
        name: video.userId.username,
        avatar: video.userId.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(video.userId.username)}&background=random`,
        subscribers: video.userId.subscribers
      }
    }));
    
    res.json(formattedVideos);
  } catch (error) {
    next(error);
  }
});

// Like a video
router.post('/:id/like', authenticateToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    const userId = req.user.id;
    const isLiked = video.likedBy.includes(userId);
    const isDisliked = video.dislikedBy.includes(userId);
    
    if (isLiked) {
      // User already liked the video, so unlike
      video.likedBy = video.likedBy.filter(id => id.toString() !== userId);
      video.likes -= 1;
    } else {
      // User hasn't liked the video, so add like
      video.likedBy.push(userId);
      video.likes += 1;
      
      // If user previously disliked, remove dislike
      if (isDisliked) {
        video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== userId);
        video.dislikes -= 1;
      }
    }
    
    await video.save();
    
    res.json({
      _id: video._id,
      likes: video.likes,
      dislikes: video.dislikes,
      isLiked: video.likedBy.includes(userId),
      isDisliked: video.dislikedBy.includes(userId)
    });
  } catch (error) {
    next(error);
  }
});

// Dislike a video
router.post('/:id/dislike', authenticateToken, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    const userId = req.user.id;
    const isLiked = video.likedBy.includes(userId);
    const isDisliked = video.dislikedBy.includes(userId);
    
    if (isDisliked) {
      // User already disliked the video, so remove dislike
      video.dislikedBy = video.dislikedBy.filter(id => id.toString() !== userId);
      video.dislikes -= 1;
    } else {
      // User hasn't disliked the video, so add dislike
      video.dislikedBy.push(userId);
      video.dislikes += 1;
      
      // If user previously liked, remove like
      if (isLiked) {
        video.likedBy = video.likedBy.filter(id => id.toString() !== userId);
        video.likes -= 1;
      }
    }
    
    await video.save();
    
    res.json({
      _id: video._id,
      likes: video.likes,
      dislikes: video.dislikes,
      isLiked: video.likedBy.includes(userId),
      isDisliked: video.dislikedBy.includes(userId)
    });
  } catch (error) {
    next(error);
  }
});

export default router;