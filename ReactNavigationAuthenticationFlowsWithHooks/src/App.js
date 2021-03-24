import React, {useReducer, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {lightTheme} from './theme/light';
import {AuthContext} from './context/AuthContext';
import {BASE_URL} from './config';
import {createAction} from './config/createAction';

const RootStack = createStackNavigator();

export default function () {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {
              ...action.payload,
            },
          };
        default:
          return state;
      }
    },
    {user: undefined},
  );

  const auth = useMemo(
    () => ({
      login: async (email, password) => {
        const {data} = await axios.post(`${BASE_URL}/auth/local`, {
          identifier: email,
          password,
        });

        const user = {
          email: data.user.email,
          token: data.jwt,
        };

        dispatch(createAction('SET_USER', user));
      },
      logout: () => {
        console.log('Logout');
      },
      register: async (email, password) => {
        await axios.post(`${BASE_URL}/auth/local/register`, {
          username: email,
          email,
          password,
        });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer theme={lightTheme}>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
