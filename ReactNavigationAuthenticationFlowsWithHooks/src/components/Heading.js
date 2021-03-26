import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export function Heading({children, style, ...props}) {
  const {colors} = useTheme();

  return (
    <Text {...props} style={[styles.text, style, {color: colors.text}]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
});
