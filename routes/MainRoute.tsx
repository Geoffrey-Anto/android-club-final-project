import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import UserScreen from '../pages/UserScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MovieDetailScreen from '../pages/MovieDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import RecentMovies from '../pages/RecentMovies';
import RandomTodaysWatch from '../pages/RandomTodaysWatch';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabRoutes() {
  return (
    <Tab.Navigator
      barStyle={{backgroundColor: '#e6e4df', height: 70}}
      theme={{
        roundness: 10,
      }}
      initialRouteName="home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={20} color={focused ? 'red' : 'blue'} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={20} color={focused ? 'red' : 'blue'} />
          ),
        }}
        name="Recent"
        component={RecentMovies}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={20} color={focused ? 'red' : 'blue'} />
          ),
        }}
        name="Todays Watch"
        component={RandomTodaysWatch}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={20} color={focused ? 'red' : 'blue'} />
          ),
        }}
        name="Settings"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
}

export default function MainRoute() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="home">
        <Stack.Screen name="home" component={MainTabRoutes} />
        <Stack.Screen name="detail" component={MovieDetailScreen} />
      </Stack.Navigator>
    </>
  );
}
