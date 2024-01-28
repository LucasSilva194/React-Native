// TicketsScreen.js

import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const TicketsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/undraw_In_progress_re_m1l6.png')}
          style={{width: 500, height: 300}}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Work in progress...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#A63A50',
    fontSize: 24,
  },
});

export default TicketsScreen;
