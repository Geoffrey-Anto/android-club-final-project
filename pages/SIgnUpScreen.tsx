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

const SignUp = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const res = await supabase.auth.signUp({email, password});
      res.error ? setError(res.error.message) : setError(null);
      if (res.data.user?.role === 'authenticated') {
        return ToastAndroid.show('Already signed up. Please Sign In', 3000);
      }
      ToastAndroid.show('Check your email for the confirmation link', 3000);
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
        Sign Up
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
      <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text style={{color: 'white'}}>Already have an account? </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'lightblue',
          }}>
          SignIn
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>
          {error}
          <TouchableOpacity onPress={() => setError(null)}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </Text>
      )}
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

export default SignUp;
