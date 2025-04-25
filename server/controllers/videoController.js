// videoController.js
import Video from '../models/Video.js';
import { v4 as uuidv4 } from 'uuid';

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};

// Get a specific video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video', error });
  }
};

// Add a comment to a video
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const video = await Video.findOne({ videoId: req.params.id });

    if (!video) return res.status(404).json({ message: 'Video not found' });

    const newComment = {
      commentId: uuidv4(),
      userId: req.user._id,
      text,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();
    res.json(video.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};
