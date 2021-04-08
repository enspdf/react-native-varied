import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from '../theme/appTheme';

interface Props {
  text: string;
  color?: string;
  width?: boolean;
  onPress: (textNumber: string) => void;
}

export const Button = ({
  text,
  color = '#2D2D2D',
  width = false,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(text)}>
      <View
        style={{
          ...styles.button,
          backgroundColor: color,
          width: width ? 180 : 80,
        }}>
        <Text
          style={{
            ...styles.textButton,
            color: color === '#9B9B9B' ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
