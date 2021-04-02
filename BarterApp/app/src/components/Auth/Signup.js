import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input, Form, Item, Button} from 'native-base';
import {useDispatch} from 'react-redux';

import theme, {Box, Text} from '../theme';

import {register} from '../../store/actions/authActions';

function Signup({navigation}) {
  const {navigate} = navigation;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userRef, setUserRef] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (!email || !phone) return alert('Please set all fields');

    const data = {
      name,
      email,
      phone,
      userRef,
    };

    navigate('Password', {data, type: 'REGISTER'});
  };

  return (
    <Box flex={1} backgroundColor="white">
      <Box paddingHorizontal="m" paddingVertical="m">
        <Box marginTop="m">
          <Form>
            <Item style={{...styles.itemStyle}}>
              <Input
                placeholder="Name & Surname"
                defaultValue={name}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item style={{...styles.itemStyle}}>
              <Input
                placeholder="Email Address"
                keyboardType="email-address"
                defaultValue={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item style={{...styles.itemStyle}}>
              <Input
                placeholder="Password"
                secureTextEntry
                defaultValue={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item style={{...styles.itemStyle}}>
              <Input
                placeholder="Phone Number"
                keyboardType="phone-pad"
                defaultValue={phone}
                onChangeText={text => setPhone(text)}
              />
            </Item>
            <Item style={{...styles.itemStyle}}>
              <Input
                placeholder="Refferal Code (Optional)"
                defaultValue={userRef}
                onChangeText={text => setUserRef(text)}
              />
            </Item>
            <Item style={{...styles.itemStyle}}>
              <Button style={{...styles.btnStyle}} onPress={onSubmit}>
                <Text variant="title1" fontSize={18} fontweight="700">
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

export default Signup;
