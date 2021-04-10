import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {styles} from '../theme/appTheme';
import {DrawerScreenProps} from '@react-navigation/drawer';

// interface Props extends StackScreenProps<any, any> {}
interface Props extends DrawerScreenProps<any, any> {}

export const Page1Screen = ({navigation}: Props) => {
  const {navigate} = navigation;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, []);

  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>Page1Screen</Text>
      <Button title="Page 2" onPress={() => navigate('Page2Screen')} />
      <Text style={{marginVertical: 20, fontSize: 20, marginLeft: 5}}>
        Navigation with args
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{...styles.bigButton, backgroundColor: '#5856D6'}}
          onPress={() => navigate('PersonScreen', {id: 1, name: 'Pedro'})}>
          <Text style={styles.bigButtonText}>Pedro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.bigButton, backgroundColor: '#FF9427'}}
          onPress={() => navigate('PersonScreen', {id: 2, name: 'Maria'})}>
          <Text style={styles.bigButtonText}>Maria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
