import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigator/StackNavigator';
import {DrawerMenuBasic} from './navigator/DrawerMenuBasic';
import {DrawerMenu} from './navigator/DrawerMenu';
import {Tabs} from './navigator/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigator /> */}
      {/* <DrawerMenuBasic /> */}
      <DrawerMenu />
      {/* <Tabs /> */}
    </NavigationContainer>
  );
};

export default App;
