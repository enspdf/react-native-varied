import React, {useContext, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import {CustomSwitch} from '../components/CustomSwitch';

import {HeaderTitle} from '../components/HeaderTitle';
import {ThemeContext} from '../context/themeContext/ThemeContext';
import {useForm} from '../hooks/useForm';
import {styles} from '../theme/appTheme';

export const TextInputScreen = () => {
  const {
    theme: {colors, dividerColor},
  } = useContext(ThemeContext);
  const {form, onChange} = useForm({
    name: '',
    email: '',
    phone: '',
    isSubscribed: false,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={styles.globalMargin}>
          <HeaderTitle title="Text Inputs" />
          <TextInput
            style={{
              ...stylesScreen.inputStyle,
              borderColor: colors.text,
              color: colors.text,
            }}
            placeholder="Type your name"
            autoCorrect={false}
            autoCapitalize="words"
            value={form.name}
            onChangeText={(value: string) => onChange(value, 'name')}
            placeholderTextColor={dividerColor}
          />
          <TextInput
            style={{
              ...stylesScreen.inputStyle,
              borderColor: colors.text,
              color: colors.text,
            }}
            placeholder="Type your email"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value: string) => onChange(value, 'email')}
            placeholderTextColor={dividerColor}
          />
          <TextInput
            style={{
              ...stylesScreen.inputStyle,
              borderColor: colors.text,
              color: colors.text,
            }}
            placeholder="Type your phone"
            keyboardType="number-pad"
            value={form.phone}
            onChangeText={(value: string) => onChange(value, 'phone')}
            placeholderTextColor={dividerColor}
          />
          <View style={stylesScreen.switchRow}>
            <Text style={{...stylesScreen.switchText, color: colors.text}}>
              Subscribe
            </Text>
            <CustomSwitch
              isOn={form.isSubscribed}
              onChange={(value: boolean) => onChange(value, 'isSubscribed')}
            />
          </View>
          <HeaderTitle title={JSON.stringify(form, null, 3)} />
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const stylesScreen = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchText: {
    fontSize: 25,
  },
});
