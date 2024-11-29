import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useApi = () => {
  const { auth } = useContext(AuthContext); // Access auth context

  const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
  });

  // Adding request interceptor
  instance.interceptors.request.use(config => {
    if (auth.user) {
      config.headers['Authorization'] = `Bearer ${auth.token}`; // Add the auth token to headers
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  return instance; // Return the axios instance
};

export default useApi;