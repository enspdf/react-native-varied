import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import {HeaderTitle} from '../components/HeaderTitle';

export const InfiniteScrolllScreen = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5]);
  const loadMore = () => {
    const newArray: number[] = [];

    for (let i = 0; i < 5; i++) {
      newArray[i] = numbers.length + 1;
    }

    setNumbers([...numbers, ...newArray]);
  };
  const renderItem = (item: number) => {
    return (
      <Image
        source={{uri: `https://picsum.photos/id/${item}/500/400`}}
        style={{width: '100%', height: 400}}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={numbers}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => renderItem(item)}
        ListHeaderComponent={() => <HeaderTitle title="Infinite Scroll" />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View
            style={{
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={20} color="#5856D6" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textItem: {
    backgroundColor: 'green',
    height: 150,
  },
});
