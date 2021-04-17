import React from 'react';
import {View, FlatList} from 'react-native';

import {FlatListMenuItem} from '../components/FlatListMenuItem';
import {HeaderTitle} from '../components/HeaderTitle';
import {menuItems} from '../data/menuItems';

import {styles} from '../theme/appTheme';

export const HomeScreen = () => {
  const itemSeparator = () => (
    <View style={{borderBottomWidth: 1, opacity: 0.4, marginVertical: 8}} />
  );

  return (
    <View style={{...styles.globalMargin, flex: 1}}>
      <FlatList
        data={menuItems}
        renderItem={({item}) => <FlatListMenuItem menuItem={item} />}
        keyExtractor={item => item.name}
        ListHeaderComponent={() => <HeaderTitle title="Menu Options" />}
        ItemSeparatorComponent={itemSeparator}
      />
    </View>
  );
};
