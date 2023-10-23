import {Image, StyleSheet, Text, View} from 'react-native';

export const RecentMovieInfoCard = ({item}: any) => (
  <View style={styles.itemContainer}>
    {item.primaryImage && (
      <Image source={{uri: item.primaryImage.url}} style={styles.image} />
    )}
    <Text style={styles.title}>{item.titleText.text}</Text>
    <Text style={styles.releaseDate}>
      Release Date: {item.releaseDate.day}/{item.releaseDate.month}/
      {item.releaseDate.year}
    </Text>
  </View>
);

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
