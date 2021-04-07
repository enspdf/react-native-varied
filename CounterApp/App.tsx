import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {HelloWorldScreen} from './src/screens/HelloWorldScreen';
import {CounterScreen} from './src/screens/CounterScreen';
import {BoxObjectModelScreen} from './src/screens/BoxObjectModelScreen';
import {DimensionsScreen} from './src/screens/DimensionsScreen';
import {PositionScreen} from './src/screens/PositionScreen';
import {FlexScreen} from './src/screens/FlexScreen';
import {TaskScreen} from './src/screens/TaskScreen';

const App = () => {
  // return <HelloWorldScreen />;

  // return <CounterScreen />;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#28425B'}}>
      {/* <BoxObjectModelScreen /> */}
      {/* <DimensionsScreen /> */}
      {/* <PositionScreen /> */}
      {/* <FlexScreen /> */}
      <TaskScreen />
    </SafeAreaView>
  );
};

export default App;
