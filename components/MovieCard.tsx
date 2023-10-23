import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Movie} from '../pages/HomeScreen';

export default function MovieCard({item, cb}: {item: Movie; cb: () => void}) {
  return (
    <TouchableOpacity onPress={cb} style={styles.movieItem}>
      <Image source={{uri: item.img}} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.name}</Text>
      <Text style={styles.movieDesc}>{item.desc}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  movieItem: {
    flex: 1 / 2,
    margin: 10,
    backgroundColor: '#212121',
    borderRadius: 10,
    padding: 10,
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDesc: {
    color: '#fff',
    fontSize: 14,
  },
});
