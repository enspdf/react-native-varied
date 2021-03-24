import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Error({error}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
});
