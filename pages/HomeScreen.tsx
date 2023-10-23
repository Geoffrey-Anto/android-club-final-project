import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {supabase} from '../lib/supabase';
import {TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import MovieCard from '../components/MovieCard';

export interface Movie {
  id: number;
  created_at: string;
  name: string;
  desc: string;
  genre: string;
  img: string;
  rating: number;
}

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [data, setData] = React.useState<Movie[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      let {
        data: movies,
        error,
        status,
      } = await supabase.from('movies').select('*');

      if (!movies) {
        return;
      }

      setData(movies.concat(movies, movies, movies).reverse());
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 10,
        }}>
        Movies
      </Text>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <MovieCard
              item={item}
              cb={() => navigation.navigate('detail', {movie: item.id})}
            />
          );
        }}
        keyExtractor={(item, idx) => {
          return idx.toString();
        }}
        numColumns={2}
      />
    </View>
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
