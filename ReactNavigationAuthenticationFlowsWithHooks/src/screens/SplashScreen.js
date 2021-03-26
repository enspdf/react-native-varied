import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';

export function SplashScreen() {
  const {colors} = useTheme();

  return <View style={[styles.container, {backgroundColor: colors.primary}]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
