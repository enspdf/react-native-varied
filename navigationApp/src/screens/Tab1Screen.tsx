import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, styles} from '../theme/appTheme';

export const Tab1Screen = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{...styles.globalMargin, marginTop: top}}>
      <Text style={styles.title}>Icons</Text>
      <Icon name="airplane-outline" size={80} color={colors.primary} />
      <Icon name="attach-outline" size={80} color={colors.primary} />
      <Icon name="bonfire-outline" size={80} color={colors.primary} />
      <Icon name="calculator-outline" size={80} color={colors.primary} />
      <Icon
        name="chatbubble-ellipses-outline"
        size={80}
        color={colors.primary}
      />
      <Icon name="images-outline" size={80} color={colors.primary} />
      <Icon name="leaf-outline" size={80} color={colors.primary} />
    </View>
  );
};
