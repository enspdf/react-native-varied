import React, {useContext} from 'react';
import {View, Button, Animated, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/themeContext/ThemeContext';

import {useAnimation} from '../hooks/useAnimation';

export const Animation101Screen = () => {
  const {
    position,
    opacity,
    fadeIn,
    fadeOut,
    startMovingPosition,
  } = useAnimation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.purpleBox,
          backgroundColor: colors.primary,
          opacity,
          transform: [
            {
              translateY: position,
            },
          ],
        }}
      />
      <Button
        title="Fade In"
        onPress={() => {
          fadeIn();
          startMovingPosition(100);
        }}
        color={colors.primary}
      />
      <Button title="Fade Out" onPress={fadeOut} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleBox: {
    width: 150,
    height: 150,
  },
});
