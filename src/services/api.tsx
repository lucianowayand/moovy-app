import axios from 'axios';
import { apiBaseUrl } from '../../config/env';

export const api = axios.create({
  baseURL: apiBaseUrl,
});

// // middleware to check if the user is authenticated, if not its redirected to login
api.interceptors.response.use(
  response => response,
  error => {
    console.log(apiBaseUrl)
    // if (error.response.status === 401) {
    //   window.location.href = 'Login';
    // }
    return Promise.reject(error);
  }
);