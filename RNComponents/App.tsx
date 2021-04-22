import React from 'react';

import {Navigator} from './src/navigator/Navigator';
import {ThemeProvider} from './src/context/themeContext/ThemeContext';

const AppState = ({children}: {children: React.ReactNode}) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const App = () => {
  return (
    <AppState>
      <Navigator />
    </AppState>
  );
};

export default App;
