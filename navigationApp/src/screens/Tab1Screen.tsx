import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableIcon} from '../components/TouchableIcon';
import {styles} from '../theme/appTheme';

export const Tab1Screen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{...styles.globalMargin, marginTop: top}}>
      <Text style={styles.title}>Icons</Text>
      <TouchableIcon iconName="airplane-outline" />
      <TouchableIcon iconName="attach-outline" />
      <TouchableIcon iconName="bonfire-outline" />
      <TouchableIcon iconName="calculator-outline" />
      <TouchableIcon iconName="chatbubble-ellipses-outline" />
      <TouchableIcon iconName="images-outline" />
      <TouchableIcon iconName="leaf-outline" />
    </View>
  );
};
