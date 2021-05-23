import React, { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReducer } from 'react';
import cafeApi from '../api/cafeApi';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  Usuario,
} from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import { useEffect } from 'react';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) return dispatch({ type: 'notAuthenticated' });

    const response = await cafeApi.get<LoginResponse>('/auth');

    if (response.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }

    dispatch({
      type: 'signUp',
      payload: {
        token: response.data.token,
        user: response.data.usuario,
      },
    });
  };

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });

      dispatch({
        type: 'signUp',
        payload: { token: data.token, user: data.usuario },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error);

      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Invalid information',
      });
    }
  };
  const signUp = async ({ nombre, correo, password }: RegisterData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });

      dispatch({
        type: 'signUp',
        payload: { token: data.token, user: data.usuario },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error.response.data);

      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Review the information',
      });
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };
  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
