import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    const cart = await AsyncStorage.getItem('cart');
    setCart(JSON.parse(cart) || []); // handle null case
  };

  const finalizarCompra = async () => {
    await AsyncStorage.removeItem('cart');
    setCart([]);
    alert('Compra finalizada!');
  };

  useEffect(() => {
    getCart();
  }, []);

  const deleteItem = async itemName => {
    try {
      // Update the state to remove the item based on the item name
      const newCart = cart.filter(item => item.title !== itemName);
      setCart(newCart);

      // Save the updated state to AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={{flex: 1, padding: 5}}>
          <Text style={styles.brandModelText}>{item.title}</Text>
          <Text style={styles.brandModelText}>{item.price}€</Text>
          <Text style={styles.brandModelText}>Quantidade: {item.quantity}</Text>
        </View>
        <Button title="Apagar" onPress={() => deleteItem(item.title)} />
      </View>
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Text style={styles.total}>Total: {total}€</Text>
          <Button title="Finalizar Compra" onPress={finalizarCompra} />
        </>
      ) : (
        <>
          <Text style={styles.emptyCart}>Carrinho vazio</Text>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
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
  image: {
    width: 100,
    height: 100,
  },
  brandModelText: {
    fontSize: 16,
  },
  total: {
    fontSize: 20,
    textAlign: 'right',
    paddingRight: 10,
  },
  emptyCart: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
});

export default CartScreen;
