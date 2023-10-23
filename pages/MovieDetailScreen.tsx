import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {supabase} from '../lib/supabase';
import {DarkTheme, NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

interface Movie {
  id: number;
  created_at: string;
  name: string;
  desc: string;
  genre: string;
  img: string;
  rating: number;
}

export default function MovieDetailScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: any;
}) {
  const [movie, setMovie] = React.useState<Movie | null>(null);
  useEffect(() => {
    const getMovie = async () => {
      let {
        data: movie,
        error,
        status,
      } = await supabase
        .from('movies')
        .select('*')
        .eq('id', route.params.movie);

      if (!movie) {
        return;
      }

      setMovie(movie[0]);
    };
    getMovie();
  }, []);
  return (
    <View style={DarkTheme.dark ? styles.movieDetail : styles.movieDetail}>
      {movie && (
        <View style={styles.movieDetail}>
          <Image source={{uri: movie.img}} style={styles.movieImage} />
          <Text style={styles.movieTitle}>{movie.name}</Text>
          <Text style={styles.movieRating}>{movie.rating}/10</Text>
          <Text style={styles.movieDesc}>
            Description:{' '}
            {movie.desc
              .concat(movie.desc, movie.desc, movie.desc, movie.desc)
              .substring(0, 250)}
          </Text>
          <Text style={styles.movieDesc}>Genre: {movie.genre}</Text>
          <Text style={styles.movieDesc}>
            Released At: {new Date(movie.created_at).toDateString()}
          </Text>
          <Text style={{...styles.movieRating, padding: 10}}>Reviews</Text>

          <ScrollView>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  margin: 10,
                  backgroundColor: '#333',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>
                  Reviewer {item}
                </Text>

                <Text style={{color: 'white', fontSize: 16, padding: 10}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quasi, voluptatum. Quas, accusanti
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  movieDetail: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212',
    height: '100%',
    width: '100%',
  },
  movieImage: {
    width: '100%',
    height: 200,
    padding: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  movieRating: {
    color: 'white',
    fontSize: 18,
    padding: 5,
  },
  movieDesc: {
    color: 'white',
    fontSize: 16,
    padding: 5,
  },
});
