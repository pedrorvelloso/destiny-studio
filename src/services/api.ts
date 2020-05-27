import axios from 'axios';
import { STORAGE } from 'utils/localStorage';

const JWT = localStorage.getItem(STORAGE.JWT);

const auth = JWT ? { Authorization: `Bearer ${JWT}` } : {};

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    ...auth,
  },
});

export default api;
