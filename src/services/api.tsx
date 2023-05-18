import axios from 'axios';
import { apiBaseUrl } from '../../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: apiBaseUrl,
});

// // middleware to check if the user is authenticated, if not its redirected to login
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      AsyncStorage.removeItem('session');
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('session');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);