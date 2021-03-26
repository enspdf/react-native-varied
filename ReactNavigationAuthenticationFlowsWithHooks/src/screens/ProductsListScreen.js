import React, {useEffect, useLayoutEffect, useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {Product} from '../components/Product';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {HeaderIconsContainer} from '../components/HeaderIconsContainer';

import {ThemeContext} from '../context/ThemeContext';
import {useUserStore} from '../stores/userStore';
import {useProductsStore} from '../stores/productsStore';

export function ProductsListScreen({navigation}) {
  const logout = useUserStore(state => state.logout);
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

  const [products, fetchProducts] = useProductsStore(state => [
    state.products,
    state.fetchProducts,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
