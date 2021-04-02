import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';

import App from './src/App';
import {name as appName} from './app.json';
import store from './src/store';

const AppRedux = () => (
  <Provider {...{store}}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
