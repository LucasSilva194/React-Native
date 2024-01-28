// Importações necessárias
import React from 'react';
import {View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const DetailsScreen = ({route}) => {
  // Obter dados do anúncio da rota
  const {ad} = route.params;

  return (
    <View>
      <Image source={{uri: ad.image}} style={{width: 200, height: 200}} />
      <Text>
        {ad.brand} {ad.model}
      </Text>
      <Text>{ad.year}</Text>
      <Text>{ad.price}</Text>
      <Text>{ad.city}</Text>
      <Text>{ad.description}</Text>

      {/* Mapa com a localização do anúncio */}
      <MapView
        style={{width: '100%', height: 300}}
        initialRegion={{
          latitude: ad.location.latitude,
          longitude: ad.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: ad.location.latitude,
            longitude: ad.location.longitude,
          }}
          title="Localização do Anúncio"
        />
      </MapView>
    </View>
  );
};

export default DetailsScreen;
