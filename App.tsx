import 'react-native-url-polyfill/auto';
import {useState, useEffect} from 'react';
import {supabase} from './lib/supabase';
import {Text, View} from 'react-native';
import {Session} from '@supabase/supabase-js';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoute from './routes/AuthRoute';
import MainRoute from './routes/MainRoute';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      {session && session.user ? <MainRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
}
