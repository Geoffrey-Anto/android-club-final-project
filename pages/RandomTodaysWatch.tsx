import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {RecentMovieInfoCard} from '../components/RecentMovieInfoCard';
import Refresh from '../components/Refresh';

const options = {
  method: 'GET',
  url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
  params: {
    list: 'most_pop_movies',
  },
  headers: {
    'X-RapidAPI-Key': 'adaa7e8686mshf56495ee819213fp147220jsnd4950fccc929',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  },
};

export default function RandomTodaysWatch() {
  const [moviesData, setMoviesData] = React.useState<any[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setMoviesData(response.data.results.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
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
        Todays Watch
      </Text>
      <Refresh
        fetchData={() => {
          ToastAndroid.show('Getting New Movies', ToastAndroid.SHORT);
          fetchData();
        }}
      />
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
