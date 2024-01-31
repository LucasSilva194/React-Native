import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapaScreen from '../screens/MapaScreen';
import ReservasScreen from '../screens/ReservasScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mapa"
        component={MapaScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Mapa"
        screenOptions={{
          tabBarActiveTintColor: '#A63A50',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}>
        <Tab.Screen
          name="Mapa"
          component={MapStack}
          options={{
            tabBarLabel: 'Mapa',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Reservas"
          component={ReservasScreen}
          options={{
            tabBarLabel: 'Reservas',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="bike" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
