import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigator/StackNavigator';
import {DrawerMenuBasic} from './navigator/DrawerMenuBasic';
import {DrawerMenu} from './navigator/DrawerMenu';
import {Tabs} from './navigator/Tabs';
import {AuthProvider} from './context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        {/* <StackNavigator /> */}
        {/* <DrawerMenuBasic /> */}
        <DrawerMenu />
        {/* <Tabs /> */}
      </AppState>
    </NavigationContainer>
  );
};

const AppState = ({children}: {children: React.ReactNode}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default App;
