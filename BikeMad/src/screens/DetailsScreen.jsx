import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {bike} = route.params;

  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    checkReservationStatus();
  }, []);

  const checkReservationStatus = async () => {
    try {
      if (bike.reserved === true) {
        setIsReserved(true);
      } else {
        setIsReserved(false);
      }
    } catch (error) {
      console.error('Error checking reservation status:', error);
    }
  };

  const handleReserve = async () => {
    try {
      const reservedBikes = await AsyncStorage.getItem('reservedBikes');
      const parsedReservedBikes = reservedBikes
        ? JSON.parse(reservedBikes)
        : [];

      if (parsedReservedBikes.includes(bike.id)) {
        Alert.alert('Bike Reservation', 'This bike is already reserved.');
      } else {
        parsedReservedBikes.push(bike.id);
        await AsyncStorage.setItem(
          'reservedBikes',
          JSON.stringify(parsedReservedBikes),
        );
        setIsReserved(true);
        Alert.alert('Bike Reservation', 'Bike reserved successfully!');
      }
    } catch (error) {
      console.error('Error handling reservation:', error);
    }
  };

  return (
    <View>
      {bike ? (
        <>
          <Text>Brand: {bike.brand}</Text>
          <Text>Model: {bike.model}</Text>
          <Text>Type: {bike.type}</Text>
          <Button
            title="Reserve"
            onPress={handleReserve}
            disabled={isReserved}
          />
        </>
      ) : (
        <Text>No bike selected</Text>
      )}
    </View>
  );
};

export default DetailsScreen;
