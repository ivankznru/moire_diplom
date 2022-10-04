import axios from 'axios';

const API_BASE_URL = 'https://vue-moire.skillbox.cc';
const NO_IMAGE = 'https://lasd.lv/public/assets/no-image.png';

const client = axios.create({
  baseURL: API_BASE_URL,
});

export { API_BASE_URL, NO_IMAGE, client };
