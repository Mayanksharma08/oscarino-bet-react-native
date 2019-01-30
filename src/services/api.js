import axios from 'axios';

const api = axios.create({
    baseURL: 'https://oscar-laravel.herokuapp.com/api/'
});

export default api;