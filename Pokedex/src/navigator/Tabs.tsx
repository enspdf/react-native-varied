import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Navigator} from './Navigator';
import {SearchTabScreen} from './SearchTab';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        activeTintColor: '#5856D6',
        labelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        style: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Navigator}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchTabScreen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={20} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
