import React, {useLayoutEffect, useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {Product} from '../components/Product';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {HeaderIconsContainer} from '../components/HeaderIconsContainer';

import {AuthContext} from '../context/AuthContext';
import {useGet} from '../hooks/useGet';
import {ThemeContext} from '../context/ThemeContext';

export function ProductsListScreen({navigation}) {
  const {logout} = useContext(AuthContext);
  const switchTheme = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconsContainer>
          <HeaderIconButton name="color-palette" onPress={switchTheme} />
          <HeaderIconButton name="log-out" onPress={logout} />
        </HeaderIconsContainer>
      ),
    });
  }, [navigation, logout, switchTheme]);

  const products = useGet('/products');

  function renderProduct({item: product}) {
    return <Product product={product} />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.productsListContainer}
      data={products}
      renderItem={renderProduct}
      keyExtractor={product => `${product.id}`}
    />
  );
}

const styles = StyleSheet.create({
  productsListContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});
