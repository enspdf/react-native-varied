import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://cafe-node-react-native.herokuapp.com/api';

const cafeApi = axios.create({ baseURL });
cafeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export default cafeApi;
