import React from 'react';
import {View, Alert, Button} from 'react-native';
import prompt from 'react-native-prompt-android';

import {HeaderTitle} from '../components/HeaderTitle';
import {styles} from '../theme/appTheme';

export const AlertScreen = () => {
  const showAlert = () => {
    Alert.alert(
      'Title',
      'Alert message content',
      [
        {text: 'Cancel', onPress: () => {}, style: 'destructive'},
        {text: 'OK', onPress: () => {}},
      ],
      {cancelable: true, onDismiss: () => {}},
    );
  };
  const showPromptAlert = () => {
    // Alert.prompt(
    //   'Are you sure?',
    //   'This action cannot be reverted',
    //   (value: string) => console.log({value}),
    //   'plain-text',
    //   'Default Text',
    //   'num-pad',
    // );

    prompt(
      'Enter password',
      'Enter your password',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => {}},
      ],
      {
        type: 'secure-text',
        cancelable: false,
        defaultValue: 'test',
        placeholder: 'placeholder',
      },
    );
  };

  return (
    <View style={styles.globalMargin}>
      <HeaderTitle title="Alerts" />
      <Button title="Show Alert" onPress={showAlert} />
      <View style={{height: 10}} />
      <Button title="Show Alert Prompt" onPress={showPromptAlert} />
    </View>
  );
};
