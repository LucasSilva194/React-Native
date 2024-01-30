import {React, useState, useEffect} from 'react';
import {View, Text, Image, Button, Alert, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({route}) => {
  const {bag} = route.params;

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const deliveryDate = () => {
    if (bag.delivery_date === null) {
      return 'Fora de Stock';
    } else {
      return bag.delivery_date;
    }
  };
  const addToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const items = storedCart ? JSON.parse(storedCart) : [];

      const item = items.find(item => item.title === bag.title);

      if (!bag.has_stock) {
        Alert.alert('Produto sem stock');
        return;
      }

      if (item) {
        item.quantity += quantity;
      } else {
        items.push({...bag, quantity});
      }

      if (quantity === 0) {
        Alert.alert('A quantidade não pode ser 0');
        return;
      }

      setCart(items);

      await AsyncStorage.setItem('cart', JSON.stringify(items));

      setQuantity(0);

      Alert.alert(`Adicionado ao carrinho: ${quantity}x ${bag.title}`);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: bag.image}} style={styles.image} />
      <Text style={[styles.brandModelText, {textAlign: 'center'}]}>
        {bag.title}
      </Text>
      <Text>{bag.brand}</Text>
      <Text style={[styles.brandModelText, {textAlign: 'center'}]}>
        {bag.price}€
      </Text>
      <Text style={styles.description}>{bag.description}</Text>
      <Text style={styles.description}>Data de entrega: {deliveryDate()}</Text>
      <View style={styles.qts}>
        <Button title="-" onPress={decreaseQuantity} />
        <Text>Quantidade: {quantity}</Text>
        <Button title="+" onPress={() => setQuantity(quantity + 1)} />
      </View>
      <View style={styles.buttons}>
        <Button title="Adicionar ao carrinho" onPress={addToCart} />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Share"
          onPress={() =>
            Share.share({
              title: `${bag.brand} - ${bag.title} - ${bag.url}`,
              message: bag.description,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  brandModelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: 400,
    height: 300,
  },

  price: {
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  qts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    marginTop: 10,
    padding: 10,
  },
  buttons: {
    width: 200,
    marginTop: 5,
    padding: 5,
  },
};

export default DetailsScreen;
