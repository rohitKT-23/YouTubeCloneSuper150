import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';  // Importing CORS
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all origins (or use app.use(cors({origin: 'http://localhost:5173'})) to allow only specific origin)
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
