import React, {useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SecureStorage from 'react-native-secure-storage';

import {lightTheme} from './theme/light';
import {darkTheme} from './theme/dark';

import {AuthStackNavigator} from './navigators/AuthStackNavigator';
import {MainStackNavigator} from './navigators/MainStackNavigator';
import {SplashScreen} from './screens/SplashScreen';
import {ThemeContext} from './context/ThemeContext';
import {StatusBar} from 'react-native';
import {useUserStore} from './stores/userStore';
import {sleep} from './utils/sleep';

const RootStack = createStackNavigator();

export default function () {
  const {setUser, setLoading, loading, user} = useUserStore(
    ({setUser, setLoading, loading, user}) => ({
      setUser,
      setLoading,
      loading,
      user,
    }),
  );

  useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('user').then(user => {
        if (user) {
          setUser(JSON.parse(user));
        }
        setLoading(false);
      });
    });
  }, [setLoading, setUser]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const switchTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  function renderScreens() {
    if (loading) {
      return <RootStack.Screen name="Splash" component={SplashScreen} />;
    }

    return user ? (
      <RootStack.Screen name="MainStack" component={MainStackNavigator} />
    ) : (
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
    );
  }

  return (
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <RootStack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
