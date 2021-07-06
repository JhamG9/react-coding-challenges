import axios from 'axios';
import config from '../config';

const domain = config.api.authUrl;

// getHttpHeaders
const getHeaders = () => {
  let headers = {
    'Accept': 'application/json',
    'Content-type': 'application/x-www-form-urlencoded'
  };

  const token = localStorage.getItem(config.storageKeys.accessToken);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Se crea instancia http con valores default
const httpInstance = axios.create({
  baseURL: domain, headers: getHeaders()
});

httpInstance.interceptors.response.use(response => response, function (error) {
  // Admin manuality error
  // Example:
  // 404 = redirect, 202 = message, etc.

  // 401 = token expired
  if (error.response.status === 401) {
    localStorage.removeItem(config.storageKeys.accessToken);
    localStorage.removeItem(config.storageKeys.code);
    window.location.replace('/');
  }
  
  return Promise.reject(error);
});

export default httpInstance;