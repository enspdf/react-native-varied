import React, {useState} from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native';

import Colors from '../../res/colors';

const CoinSearch = ({onChange}) => {
  const [query, setQuery] = useState('');

  const handleText = query => {
    setQuery(query);

    if (onChange) {
      onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search Coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinSearch;
