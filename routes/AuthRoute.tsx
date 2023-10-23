import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SIgnUpScreen';
import SignInScreen from '../pages/SignInScreen';

const Stack = createStackNavigator();

export default function AuthRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
