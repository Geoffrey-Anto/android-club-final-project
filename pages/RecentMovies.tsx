import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {RecentMovieInfoCard} from '../components/RecentMovieInfoCard';

export default function RecentMovies() {
  const [moviesData, setMoviesData] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming',
        headers: {
          'X-RapidAPI-Key':
            'adaa7e8686mshf56495ee819213fp147220jsnd4950fccc929',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setMoviesData(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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
          marginBottom: 20,
        }}>
        Upcoming Movies
      </Text>
      <FlatList
        data={moviesData}
        keyExtractor={item => item._id}
        renderItem={RecentMovieInfoCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 150,
    color: 'white',
  },
  releaseDate: {
    fontSize: 10,
    color: '#999',
  },
});
