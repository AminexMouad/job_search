import axios from 'axios';
import {API_URL} from '@env';

const BASE_URL = API_URL;
export const client = axios.create({
  baseURL: BASE_URL,
});
