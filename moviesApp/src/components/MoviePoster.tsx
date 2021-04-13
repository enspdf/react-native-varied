import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {Movie} from '../interfaces/MovieInterface';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

export const MoviePoster = ({movie, height = 420, width = 300}: Props) => {
  const uri: string = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{...styles.container, width, height}}
      onPress={() => navigate('DetailScreen', movie)}>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 420,
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
