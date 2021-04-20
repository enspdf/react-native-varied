import React from 'react';
import {View, FlatList} from 'react-native';

import {FlatListMenuItem} from '../components/FlatListMenuItem';
import {HeaderTitle} from '../components/HeaderTitle';
import {ItemSeparator} from '../components/ItemSeparator';
import {menuItems} from '../data/menuItems';

import {styles} from '../theme/appTheme';

export const HomeScreen = () => {
  return (
    <View style={{...styles.globalMargin, flex: 1}}>
      <FlatList
        data={menuItems}
        renderItem={({item}) => <FlatListMenuItem menuItem={item} />}
        keyExtractor={item => item.name}
        ListHeaderComponent={() => <HeaderTitle title="Menu Options" />}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </View>
  );
};
