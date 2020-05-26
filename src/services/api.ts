import axios from 'axios';

/**
 * @TODO create login page
 */
const JWT = localStorage.getItem('jwt');

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${JWT}`,
  },
});

export default api;
