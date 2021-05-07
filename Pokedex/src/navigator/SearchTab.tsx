import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {PokemonScreen} from '../screens/PokemonScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {RootStackParams} from './Navigator';

const SearchTab = createStackNavigator<RootStackParams>();

export const SearchTabScreen = () => {
  return (
    <SearchTab.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <SearchTab.Screen name="HomeScreen" component={SearchScreen} />
      <SearchTab.Screen name="PokemonScreen" component={PokemonScreen} />
    </SearchTab.Navigator>
  );
};
