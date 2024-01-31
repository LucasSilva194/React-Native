// StationsScreen.js

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';

const StationsScreen = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          loadStations();
        } else {
          console.error('Location permission denied');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    const loadStations = async () => {
      try {
        const response = await axios.get(
          'https://gogo-api-amber.vercel.app/stations',
        );
        setStations(response.data);
      } catch (error) {
        console.error('Error loading stations:', error);
      } finally {
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 41.354639,
            longitude: -8.756689,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {stations.map(station =>
            // Check if station.id is defined before rendering Marker
            // If not defined, you can use an alternative unique identifier or skip rendering
            station.id ? (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.location.latitude,
                  longitude: station.location.longitude,
                }}
                title={station.name}
                description={station.description}
                pinColor={'blue'} // Customize the marker color
              />
            ) : null,
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StationsScreen;
