import axios from 'axios';
import { API_URL } from '../utils/constants';

const commentApi = axios.create({
  baseURL: `${API_URL}/comments`,
  withCredentials: true,
});

export const fetchComments = async (videoId) => {
  try {
    const response = await commentApi.get(`/${videoId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch comments';
    throw new Error(errorMessage);
  }
};

export const addComment = async (videoId, text) => {
  try {
    const response = await commentApi.post(`/${videoId}`, { text });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to add comment';
    throw new Error(errorMessage);
  }
};

export const updateComment = async (videoId, commentId, text) => {
  try {
    const response = await commentApi.put(`/${videoId}/${commentId}`, { text });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update comment';
    throw new Error(errorMessage);
  }
};

export const deleteComment = async (videoId, commentId) => {
  try {
    const response = await commentApi.delete(`/${videoId}/${commentId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete comment';
    throw new Error(errorMessage);
  }
};