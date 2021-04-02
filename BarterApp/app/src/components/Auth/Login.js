import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import theme, {Box, Text} from '../theme';
import {Input, Form, Item, Button} from 'native-base';

function Login({navigation}) {
  const {navigate} = navigation;
  const [email, setEmail] = useState('');

  const onLogin = () => navigate('Password', {data: {email}, type: 'LOGIN'});

  return (
    <Box flex={1} backgroundColor="white">
      <Box paddingHorizontal="m" paddingVertical="m">
        <Text>
          Whether you're creating an account or signing back let's start with
          you email & password
        </Text>
        <Box marginTop="m">
          <Form>
            <Item style={{...styles.itemStyle}}>
              <Input
                placeholder="Email Address"
                keyboardType="email-address"
                defaultValue={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item style={{...styles.itemStyle}}>
              <Button style={{...styles.btnStyle}} onPress={onLogin}>
                <Text variant="title1" fontSize={18} fontWeight="700">
                  Continue
                </Text>
              </Button>
            </Item>
          </Form>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: 20,
  },
  btnStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.barter,
    borderRadius: 5,
  },
});

export default Login;
