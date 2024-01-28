import React, {useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Image, Text, Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [ads, setAds] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch ads from the API
    fetch('https://carswap-api.vercel.app/ads')
      .then(response => response.json())
      .then(data => setAds(data))
      .catch(error => console.error('Error fetching ads:', error));

    // Load favorites from AsyncStorage
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async adId => {
    // Add or remove from favorites
    const isFavorite = favorites.includes(adId);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(id => id !== adId);
    } else {
      updatedFavorites = [...favorites, adId];
    }

    setFavorites(updatedFavorites);

    // Save favorites to AsyncStorage
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const renderAdItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailsScreen', {ad: item})}>
      <Card>
        <Card.Image source={{uri: item.image}} />
        <Text style={[styles.brandModelText, {textAlign: 'center'}]}>
          {item.brand} {item.model}
        </Text>
        <Text style={[styles.yearText, {textAlign: 'center'}]}>
          Ano: {item.year}
        </Text>
        <Text style={[styles.priceText, {textAlign: 'center'}]}>
          Preço: {item.price}€
        </Text>
        <Text style={[styles.cityText, {textAlign: 'center'}]}>
          Cidade: {item.city}
        </Text>
        <Button
          title={
            favorites.includes(item.id)
              ? 'Remove from Favorites'
              : 'Add to Favorites'
          }
          onPress={() => toggleFavorite(item.id)}
        />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={ads}
        keyExtractor={item => item.id.toString()}
        renderItem={renderAdItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = {
  brandModelText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityText: {
    fontSize: 16,
  },
};

export default HomeScreen;
