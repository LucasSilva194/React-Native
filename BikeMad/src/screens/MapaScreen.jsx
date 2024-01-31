import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const MapasScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://bikemad-api.vercel.app/bikes')
      .then(response => response.json())
      .then(data => setBikes(data))
      .catch(error => console.error('Error fetching bikes:', error));
  }, []);

  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredBikes(bikes);
    } else {
      const filteredData = bikes.filter(item => item.type === selectedType);
      setFilteredBikes(filteredData);
    }
  }, [selectedType, bikes]);

  const renderItem = ({item, index}) => {
    const textColor = '#F0E7D8';

    let markerColor = 'blue'; // Default color
    if (item.type === 'Electric') {
      markerColor = 'green';
    } else if (item.type === 'Mountain') {
      markerColor = 'orange';
    } else if (item.type === 'Road') {
      markerColor = 'red';
    }

    return (
      <Marker
        key={item.id}
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
        title={item.brand}
        description={item.model}
        pinColor={markerColor}
        onCalloutPress={() => navigation.navigate('Details', {bike: item})}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <Text
          onPress={() => setSelectedType('All')}
          style={{color: selectedType === 'All' ? 'red' : 'black'}}>
          All
        </Text>
        <Text
          onPress={() => setSelectedType('Electric')}
          style={{color: selectedType === 'Electric' ? 'red' : 'black'}}>
          Electric
        </Text>
        <Text
          onPress={() => setSelectedType('Mountain')}
          style={{color: selectedType === 'Mountain' ? 'red' : 'black'}}>
          Mountain
        </Text>
        <Text
          onPress={() => setSelectedType('Road')}
          style={{color: selectedType === 'Road' ? 'red' : 'black'}}>
          Road
        </Text>
      </View>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 41.3486,
          longitude: -8.7478,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {filteredBikes.map((bike, index) => renderItem({item: bike, index}))}
      </MapView>
    </View>
  );
};

const styles = {
  brandModelText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  typeText: {
    fontSize: 16,
  },
};

export default MapasScreen;
