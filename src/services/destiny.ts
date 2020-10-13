import axios from 'axios';
import { STORAGE } from 'utils/localStorage';

const JWT = localStorage.getItem(STORAGE.JWT);

const auth = JWT ? { Authorization: `Bearer ${JWT}` } : {};

const destiny = axios.create({
  baseURL: `http://${process.env.REACT_APP_API}:3333`,
  headers: {
    ...auth,
  },
});

export default destiny;
