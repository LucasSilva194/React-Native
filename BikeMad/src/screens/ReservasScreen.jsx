import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReservationsScreen = ({navigation}) => {
  const [Reservations, setReservations] = useState([]);
  const [BikeDetails, setBikeDetails] = useState({});

  const getReservations = async () => {
    try {
      const storedReservations = await AsyncStorage.getItem('reservedBikes');
      setReservations(JSON.parse(storedReservations) || []);
    } catch (error) {
      console.error('Error getting reservations:', error);
    }
  };

  const getBikeDetails = async id => {
    try {
      const response = await fetch(
        `https://bikemad-api.vercel.app/bikes/${id}`,
      );
      const data = await response.json();
      setBikeDetails(data);
    } catch (error) {
      console.error('Error fetching bike details:', error);
    }
  };

  const deleteReservation = async id => {
    try {
      const storedReservations = await AsyncStorage.getItem('reservedBikes');
      const parsedReservations = JSON.parse(storedReservations);
      const newReservations = parsedReservations.filter(
        reservation => reservation !== id,
      );
      await AsyncStorage.setItem(
        'reservedBikes',
        JSON.stringify(newReservations),
      );
      setReservations(newReservations);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (Reservations.length > 0) {
      getBikeDetails(Reservations[0]);
    }
  }, [Reservations]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={{flex: 1, padding: 5}}>
          <Text style={styles.brandModelText}>Brand: {BikeDetails.brand}</Text>
          <Text style={styles.brandModelText}>Model: {BikeDetails.model}</Text>
          <Text style={styles.brandModelText}>Type: {BikeDetails.type}</Text>
        </View>
        <Button title="Delete" onPress={() => deleteReservation(item)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Reservations.length > 0 ? (
        <>
          <FlatList
            data={Reservations}
            renderItem={renderItem}
            keyExtractor={item => item.toString()}
          />
        </>
      ) : (
        <>
          <Text style={styles.empty}>No reservations found.</Text>
          <Button title="Back" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  brandModelText: {
    fontSize: 16,
  },
  empty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
});

export default ReservationsScreen;
