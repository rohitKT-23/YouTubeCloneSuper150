import axios from 'axios';
import { API_URL } from '../utils/constants';

const videoApi = axios.create({
  baseURL: `${API_URL}/videos`,
  withCredentials: true,
});

export const fetchVideos = async (category) => {
  try {
    const response = await videoApi.get('/', {
      params: category ? { category } : {},
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch videos';
    throw new Error(errorMessage);
  }
};

export const fetchVideoById = async (videoId) => {
  try {
    const response = await videoApi.get(`/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export const searchVideos = async (query) => {
  try {
    const response = await videoApi.get('/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Search failed';
    throw new Error(errorMessage);
  }
};

export const likeVideo = async (videoId) => {
  try {
    const response = await videoApi.post(`/${videoId}/like`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to like video';
    throw new Error(errorMessage);
  }
};

export const dislikeVideo = async (videoId) => {
  try {
    const response = await videoApi.post(`/${videoId}/dislike`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to dislike video';
    throw new Error(errorMessage);
  }
};