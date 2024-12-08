import axios from 'axios';

const getAuthToken = () => localStorage.getItem('access_token') || '';

// const baseURL = 'http://duettos.api.dev.equitys.com.br/';
// const baseURL = 'https://duettos-api.equitys.com.br/';
const baseURL = 'http://127.0.0.1:8000/api/';



export const axiosInstanceAuthenticated = axios.create({
  baseURL,
});



axiosInstanceAuthenticated.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstanceAuthenticated.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


axiosInstanceAuthenticated.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token'); 
       window.location.href = '/login'; 
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token'); 
       window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export const axiosInstanceUnauthenticated = axios.create({
  baseURL,
});
