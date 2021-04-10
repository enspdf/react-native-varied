import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {styles} from '../theme/appTheme';

export const Page2Screen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Example',
      headerBackTitle: 'back',
    });
  }, []);

  return (
    <View style={styles.globalMargin}>
      <Text style={styles.title}>Page2Screen</Text>
      <Button
        title="Page 3"
        onPress={() => navigation.navigate('Page3Screen')}
      />
    </View>
  );
};
