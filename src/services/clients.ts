import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const developer = process.env.REACT_APP_DEVELOPER;

export const mainClient = axios.create({
  baseURL,
  timeout: 6000,
  headers: { 'Content-Type': 'multipart/form-data' },
  params: { developer },
});
