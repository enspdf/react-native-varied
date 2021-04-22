import React, {createContext, useEffect, useReducer} from 'react';
import {Appearance, AppState, useColorScheme} from 'react-native';

import {themeReducer, ThemeState, lightTheme, darkTheme} from './themeReducer';

interface ThemeContextProps {
  theme: ThemeState;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const colorScheme = useColorScheme();
  const [theme, dispatch] = useReducer(
    themeReducer,
    colorScheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'active') {
        Appearance.getColorScheme() === 'light'
          ? setLightTheme()
          : setDarkTheme();
      }
    });
  }, []);

  // useEffect(() => {
  //   colorScheme === 'light' ? setLightTheme() : setDarkTheme();
  // }, [colorScheme]);

  const setDarkTheme = () => {
    dispatch({type: 'set_dark_theme'});
  };
  const setLightTheme = () => {
    dispatch({type: 'set_light_theme'});
  };

  return (
    <ThemeContext.Provider value={{theme, setDarkTheme, setLightTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
