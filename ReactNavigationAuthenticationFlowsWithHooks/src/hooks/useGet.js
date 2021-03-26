import {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import {UserContext} from '../context/UserContext';
import {BASE_URL} from '../config';

export function useGet(endpoint, initialValue) {
  const {token} = useContext(UserContext);
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    axios
      .get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(({data}) => {
        setData(data);
      });
  }, [token, endpoint]);

  return data;
}
