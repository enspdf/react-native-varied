import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContex';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ navigation, route }: Props) => {
  const { id = '', name = '' } = route.params;
  const [tempUri, setTempUri] = useState<string>();
  const { categories } = useCategories();
  const { loadProductById, addProduct, updateProduct, uploadImage } =
    useContext(ProductsContext);
  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } =
    useForm({
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    });

  useEffect(() => {
    navigation.setOptions({ title: nombre ? nombre : 'New Product' });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;

    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoryId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, nombre);

      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, response => {
      if (response.didCancel || !response.uri) return;

      setTempUri(response.uri);
      uploadImage(response, _id);
    });
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
      if (response.didCancel || !response.uri) return;

      setTempUri(response.uri);
      uploadImage(response, _id);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          placeholder="Product"
          style={styles.textInput}
          onChangeText={value => onChange(value, 'nombre')}
          value={nombre}
        />
        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(category => (
            <Picker.Item
              label={category.nombre}
              value={category._id}
              key={category._id}
            />
          ))}
        </Picker>
        <Button title="Save" onPress={saveOrUpdate} color="#5856D6" />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Camera" onPress={takePhoto} color="#5856D6" />
            <View style={{ width: 10 }} />
            <Button
              title="Gallery"
              onPress={takePhotoFromGallery}
              color="#5856D6"
            />
          </View>
        )}

        {img.length > 0 && !tempUri && (
          <Image source={{ uri: img }} style={{ width: '100%', height: 300 }} />
        )}
        {tempUri && (
          <Image
            source={{ uri: tempUri }}
            style={{ width: '100%', height: 300 }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
