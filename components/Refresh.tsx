import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function Refresh({fetchData}: {fetchData: () => void}) {
  return (
    <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
      <Text style={styles.buttonText}>Refresh</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  refreshButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
