import axios from 'axios';

// We will replace this URL after deploying the backend
const API_URL = 'https://an-enterprise-petfood-api.onrender.com'; 

const api = axios.create({
    baseURL: API_URL
});

export default api;