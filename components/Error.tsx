import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Error({error, cb}: {error: string; cb: () => void}) {
  return (
    <Text style={styles.errorText}>
      {error}
      <TouchableOpacity onPress={cb}>
        <Text style={styles.clearButton}>Clear</Text>
      </TouchableOpacity>
    </Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  clearButton: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});
