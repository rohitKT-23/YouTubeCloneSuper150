// videoRoutes.js
import express from 'express';
import { getAllVideos, getVideoById, addComment } from '../controllers/videoController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all videos
router.get('/', getAllVideos);

// Get a specific video
router.get('/:id', getVideoById);

// Add a comment (protected route)
router.post('/:id/comments', protect, addComment);

export default router;
