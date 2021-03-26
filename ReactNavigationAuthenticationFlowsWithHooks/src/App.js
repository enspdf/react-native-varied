import React, {useState, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDarkMode} from 'react-native-dark-mode';

import {lightTheme} from './theme/light';
import {darkTheme} from './theme/dark';

import {AuthContext} from './context/AuthContext';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {MainStackNavigator} from './navigators/MainStackNavigator';
import {useAuth} from './hooks/useAuth';
import {UserContext} from './context/UserContext';
import {SplashScreen} from './screens/SplashScreen';
import {ThemeContext} from './context/ThemeContext';
import {StatusBar} from 'react-native';

const RootStack = createStackNavigator();

export default function () {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {auth, state} = useAuth();
  // const isDarkMode = useDarkMode();

  const switchTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name="Splash" component={SplashScreen} />;
    }

    return state.user ? (
      <RootStack.Screen name="MainStack">
        {() => (
          <UserContext.Provider value={state.user}>
            <MainStackNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  }

  return (
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
          <RootStack.Navigator
            screenOptions={{headerShown: false, animationEnabled: false}}>
            {renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
