import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import CoinItem from '../coins/CoinItem';

import Colors from '../../res/colors';
import Storage from '../../libs/storage';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));

      setFavorites(favorites);
    } catch (error) {
      console.log('getFavorites error', error);
    }
  };

  const handlePress = coin => {
    navigation.navigate('CoinDetail', {coin});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 && <FavoritesEmptyState />}
      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
});

export default FavoritesScreen;
