import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import COLORS from '../../consts/colors';

const OnBoardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/onboardImage.jpeg')}>
        <View style={styles.details}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.title}>world with us</Text>
          <Text style={{color: COLORS.white, lineHeight: 25, marginTop: 15}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
            sem non erat vehicula dignissim. Morbi eget congue ante, feugiat.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HomeScreen')}>
            <View style={styles.btn}>
              <Text style={{fontWeight: 'bold'}}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  title: {
    color: COLORS.white,
    fontSize: 35,
    fontWeight: 'bold',
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardScreen;
