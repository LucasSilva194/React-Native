// LiveScheduleScreen.js

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const LiveScheduleScreen = () => {
  const [routes, setRoutes] = useState([]);

  // Função para carregar e atualizar as rotas a cada 5 minutos
  const loadRoutes = async () => {
    try {
      // Lógica para chamar a API e obter as rotas (usando fetch ou axios)
      const response = await fetch('https://gogo-api-amber.vercel.app/routes');
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error('Erro ao carregar rotas:', error);
    }
  };

  useEffect(() => {
    // Carregar rotas no início
    loadRoutes();

    // Atualizar rotas a cada 5 minutos
    const interval = setInterval(() => {
      loadRoutes();
    }, 300000); // 300000 milissegundos = 5 minutos

    return () => clearInterval(interval); // Limpar intervalo ao desmontar o componente
  }, []);

  const renderItem = ({item, index}) => {
    const backgroundColor = index === 0 ? '#A63A50' : '#AB9B96';
    const textColor = '#F0E7D8';

    return (
      <View
        style={{
          backgroundColor,
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 4,
        }}>
        <Text style={{color: textColor, fontSize: 16, fontWeight: 'bold'}}>
          {item.name}
        </Text>
        <Text style={{color: textColor}}>{`Origem: ${item.origin}`}</Text>
        <Text style={{color: textColor}}>{`Destino: ${item.destination}`}</Text>
        <Text
          style={{
            color: textColor,
          }}>{`Tipo de transporte: ${item.type}`}</Text>
        <Text
          style={{
            color: textColor,
          }}>{`Próxima partida: ${item.next_departure_time}`}</Text>
        <Text style={{color: textColor}}>{`Estado: ${item.status}`}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Next departures</Text>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A63A50',
  },
});

export default LiveScheduleScreen;
