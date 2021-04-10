import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigator/StackNavigator';
import {DrawerMenuBasic} from './navigator/DrawerMenuBasic';
import {DrawerMenu} from './navigator/DrawerMenu';

const App = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigator /> */}
      {/* <DrawerMenuBasic /> */}
      <DrawerMenu />
    </NavigationContainer>
  );
};

export default App;
