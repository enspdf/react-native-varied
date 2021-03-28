import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';

import CoinItem from './CoinItem';
import CoinSearch from './CoinSearch';

import Http from '../../libs/http';
import Colors from '../../res/colors';

const CoinsScreen = ({navigation}) => {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoinst] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoins = async () => {
    setLoading(true);

    const {data} = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    setCoins(data);
    setAllCoinst(data);
    setLoading(false);
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handleSearch = query => {
    const coinsFiltered = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setCoins(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearch} />
      {loading && (
        <ActivityIndicator style={styles.loader} color="blue" size="large" />
      )}
      <FlatList
        data={coins}
        renderItem={({item}) => (
          <CoinItem
            item={item}
            onPress={() => navigation.navigate('CoinDetail', {coin: item})}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
