import React, {useContext, useState} from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HeaderTitle} from '../components/HeaderTitle';
import {ThemeContext} from '../context/themeContext/ThemeContext';
import {styles} from '../theme/appTheme';

export const PullToRefreshScreen = () => {
  const {
    theme: {colors, dividerColor, dark},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<string>();
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setData('Some random string');
    }, 1500);
  };

  return (
    <ScrollView
      style={{marginTop: refreshing ? top : 0}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={dividerColor}
          colors={[colors.text]}
          // style={{backgroundColor: '#5756D6'}}
          tintColor={dark ? 'white' : 'black'}
          //   title="Refreshing"
          //   titleColor="white"
        />
      }>
      <View style={styles.globalMargin}>
        <HeaderTitle title="Pull to refresh" />
        {data && <HeaderTitle title={data} />}
      </View>
    </ScrollView>
  );
};
