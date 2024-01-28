// StationsScreen.js

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';

const busStopIcon = require('../assets/bus-stop.png');

const StationsScreen = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await axios.get(
          'https://gogo-api-amber.vercel.app/stations',
        );
        setStations(response.data);
      } catch (error) {
        console.error('Error loading stations:', error);
      }
    };

    loadStations();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 41.354639,
          longitude: -8.756689,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {stations.map(station => (
          <Marker
            key={station.id} // Ensure each marker has a unique key
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            description={station.description}
            image={busStopIcon}
          />
        ))}
      </MapView>
    </View>
  );
};

export default StationsScreen;
