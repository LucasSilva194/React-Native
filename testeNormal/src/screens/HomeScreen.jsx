import {React, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';
import {Card, Text} from '@rneui/themed';

const HomeScreen = ({navigation}) => {
  const [bags, setBags] = useState([]);

  /* USE EFFECT PARA IR BUSCAR TODAS AS MALAS */
  /*   useEffect(() => {
    fetch('https://nearfetch-api.vercel.app/bags')
      .then(response => response.json())
      .then(data => setBags(data))
      .catch(error => console.error('Error fetching bags:', error));
  }, []); */

  /* USE EFFECT PARA IR BUSCAR AS MALAS E ORDENAR POR POPULARIDADE */
  useEffect(() => {
    fetch('https://nearfetch-api.vercel.app/bags')
      .then(response => response.json())
      .then(data => {
        const sortedBags = data.sort(
          (a, b) => b.popularity_score - a.popularity_score,
        );
        setBags(sortedBags);
      })
      .catch(error => console.error('Error fetching bags:', error));
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetch('https://nearfetch-api.vercel.app/bags')
      .then(response => response.json())
      .then(data => {
        const sortedBags = data.sort(
          (a, b) => b.popularity_score - a.popularity_score,
        );
        setBags(sortedBags);
      })
      .catch(error => console.error('Error fetching bags:', error))
      .finally(() => setRefreshing(false));
  };

  const renderBag = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailsScreen', {bag: item})}>
      <Card>
        <Card.Image source={{uri: item.image}} />
        <Text style={[styles.brandModelText, {textAlign: 'center'}]}>
          {item.brand} <Text>{item.title}</Text>
        </Text>
        <Text style={[styles.brandModelText, {textAlign: 'center'}]}>
          {item.price}€
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Carrinho" onPress={() => navigation.navigate('Cart')} />
      <FlatList
        data={bags}
        renderItem={renderBag}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  brandModelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
};

export default HomeScreen;
