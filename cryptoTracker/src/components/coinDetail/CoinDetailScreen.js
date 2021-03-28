import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';

import CoinMarketItem from '../coinDetail/CoinMarketItem';

import Http from '../../libs/http';
import Storage from '../../libs/storage';
import Colors from '../../res/colors';

const CoinDetailScreen = ({route, navigation}) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getSymbolIcon = coinNameId => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };

  const getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  const getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  };

  useEffect(() => {
    const {coin} = route.params;

    navigation.setOptions({title: coin.symbol});
    getMarkets(coin.id);
    setCoin(coin);

    getFavorite(coin);
  }, [navigation, route, coin]);

  const toggleFavorite = () => {
    isFavorite ? removeFavorite() : addFavorite();
  };

  const addFavorite = async () => {
    const currentCoin = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, currentCoin);

    stored && setIsFavorite(true);
  };

  const removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;
          await Storage.instance.remove(key);

          setIsFavorite(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const getFavorite = async coin => {
    try {
      const key = `favorite-${coin.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr != null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('get favorites error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(coin.nameid)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImg: {
    height: 25,
    width: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
