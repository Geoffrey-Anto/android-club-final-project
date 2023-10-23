import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {supabase} from '../lib/supabase';
import {Button, Input} from 'react-native-elements';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope', color: 'white'}}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          inputStyle={styles.input}
          labelStyle={styles.label}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{type: 'font-awesome', name: 'lock', color: 'white'}}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          inputStyle={styles.input}
          labelStyle={styles.label}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
          buttonStyle={styles.signInButton}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          buttonStyle={styles.signUpButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Dark background color
    padding: 12,
    justifyContent: 'center',
    width: '100%',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    color: 'white', // Label text color
  },
  input: {
    color: 'white', // Input text color
  },
  signInButton: {
    backgroundColor: '#FF5722', // Orange accent color
  },
  signUpButton: {
    backgroundColor: '#2196F3', // Blue accent color
  },
});
