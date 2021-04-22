import React, {useContext, useState} from 'react';
import {Switch, Platform} from 'react-native';

import {ThemeContext} from '../context/themeContext/ThemeContext';

interface Props {
  isOn: boolean;
  onChange: (value: boolean) => void;
}

export const CustomSwitch = ({isOn, onChange}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(isOn);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange(!isEnabled);
  };

  return (
    <Switch
      trackColor={{false: '#D9D9DB', true: colors.primary}}
      thumbColor={Platform.OS === 'android' ? colors.primary : ''}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
