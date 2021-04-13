import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '801a8ff55b832bc0277774fe6d062870',
    language: 'en-US',
  },
});

export default movieDB;
