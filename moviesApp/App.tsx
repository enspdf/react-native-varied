import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigation/Navigation';
import {FadeScreen} from './src/screens/FadeScreen';
import {GradientProvider} from './src/context/GradientContext';

const AppState = ({children}: {children: React.ReactNode}) => {
  return <GradientProvider>{children}</GradientProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
      {/* <FadeScreen /> */}
    </NavigationContainer>
  );
};

export default App;
