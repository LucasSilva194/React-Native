// AppNavigator.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LiveScheduleScreen from '../screens/LiveSchedule';
import StationsScreen from '../screens/Stations';
import TicketsScreen from '../screens/Tickets';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="LiveSchedule"
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
          name="LiveSchedule"
          component={LiveScheduleScreen}
          options={{
            tabBarLabel: 'Horários',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="alarm" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Stations"
          component={StationsScreen}
          options={{
            tabBarLabel: 'Estações',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="bus-stop"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Tickets"
          component={TicketsScreen}
          options={{
            tabBarLabel: 'Bilhetes',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="ticket-confirmation"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
