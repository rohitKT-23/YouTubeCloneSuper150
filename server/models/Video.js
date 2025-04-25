// Video.js (Model)
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  commentId: String,
  userId: String,
  text: String,
  timestamp: Date,
});

const videoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  thumbnailURL: String,
  videoURL: String,
  description: String,
  channelId: String,
  uploader: String,
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: String,
  comments: [commentSchema],
});

export default mongoose.model('Video', videoSchema);
