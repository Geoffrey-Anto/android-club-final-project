import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {supabase} from '../lib/supabase';
import {TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {Session} from '@supabase/supabase-js';
import {Button} from 'react-native';

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [user, setUser] = React.useState<Session | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setUser(session);
    });
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
        My Account
      </Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 10,
        }}>
        {user?.user?.email}
      </Text>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          padding: 10,
        }}>
        {user?.user?.role}
      </Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Change Password
        </Text>

        <TextInput
          onChange={e => {
            setPassword(e.nativeEvent.text);
          }}
          style={styles.input}
          placeholder="New Password"
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'lightblue',
            padding: 10,
            width: '70%',
          }}
          onPress={async () => {
            if (!password) {
              return;
            }
            const res = await supabase.auth.updateUser({
              password: password,
            });

            if (res.error) {
              ToastAndroid.show('Something went wrong!', 3000);
            } else {
              ToastAndroid.show('Password changed!', 3000);
            }
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: 'red',
          padding: 10,
          width: '100%',
        }}
        onPress={async () => {
          await supabase.auth.signOut();
          navigation.navigate('SignIn');
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Sign Out
        </Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    backgroundColor: '#fff',
  },
});
