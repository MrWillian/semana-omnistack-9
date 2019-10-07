import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import api from '../services/api';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    spots.visible = false;
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { tech }
      });
      response.data.visible = true;
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleNavigation(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
      
      <FlatList 
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>

            <ShimmerPlaceHolder style={{ width: 200, height: 110}} autoRun={true} visible={true}>
              <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url}} />
            </ShimmerPlaceHolder>

            <ShimmerPlaceHolder style={{ width: '100%', height: 15}} autoRun={true} visible={true}>
              <Text style={styles.company}>{item.company}</Text>
            </ShimmerPlaceHolder>

            <ShimmerPlaceHolder style={{ width: '100%', height: 10}} autoRun={true} visible={true}>
              <Text style={styles.price}>{item.price ? `R$${item.price}` : 'GRATUITO'}</Text>
            </ShimmerPlaceHolder>

            <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            
          </View>
        )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  label: {
    fontSize: 18,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    marginRight: 15,
  },

  thumbnail: {
    width: 200,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  company: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default withNavigation(SpotList);
