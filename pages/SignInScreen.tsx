import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {supabase} from '../lib/supabase';
import {NavigationProp} from '@react-navigation/native';
import Error from '../components/Error';

const SignIn = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const res = await supabase.auth.signInWithPassword({email, password});
      res.error ? setError(res.error.message) : setError(null);
      if (res.data.user?.role === 'authenticated') {
        return ToastAndroid.show('Already signed up. Please Sign In', 3000);
      }

      console.log(res);
    } catch (error) {
      ToastAndroid.show('Something went wrong!', 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          color: 'white',
          marginBottom: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Sign In
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} disabled={loading} />
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={{color: 'white'}}>Don't have an account? </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'lightblue',
          }}>
          SignUp
        </Text>
      </TouchableOpacity>

      {error && <Error cb={() => setError(null)} error={error}></Error>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#333', // Dark background color
    height: '100%',
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
});

export default SignIn;
