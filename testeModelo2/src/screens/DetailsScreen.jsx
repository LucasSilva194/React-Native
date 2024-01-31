// Importações necessárias
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

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
        provider={PROVIDER_GOOGLE}
        style={styles.maps}
        initialRegion={{
          latitude: ad.location.latitude,
          longitude: ad.location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker
          coordinate={{
            latitude: ad.location.latitude,
            longitude: ad.location.longitude,
          }}
          title={ad.brand}
          description={ad.model}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  maps: {
    width: '100%',
    height: 300,
  },
});

export default DetailsScreen;
