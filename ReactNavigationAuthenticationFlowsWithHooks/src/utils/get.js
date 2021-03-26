import axios from 'axios';
import {BASE_URL} from '../config';

import {useUserStore} from '../stores/userStore';

export const get = async endpoint => {
  const {token} = useUserStore.getState().user;
  const {data} = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  return data;
};
