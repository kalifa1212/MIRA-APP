
import {COLORS,icons,images,SIZES} from '../constants';
import {Mosque,Predication,ScreenHeaderBtn,Welcome} from '../components'

import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, FlatList, StatusBar, Animated, View,StyleSheet,TouchableOpacity,Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const Home = () => {
    const router = useRouter();
    const item = "G";
  
    const renderItem = ({ item }) => {
      if (item.key === 'predication') return <Predication />;
      if (item.key === 'mosque') return <Mosque />;
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8b500" />
  
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#f8b500' },
            headerShadowVisible: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerRight: () => (
              <Feather
                name="bell"
                size={24}
                color="#000"
                onPress={() => router.push(`/notification/${item}`)}
              />
            ),
            headerTitle: "Mira App",
          }}
        />
  
        {/* Barre de recherche cliquable */}
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push(`/search/${item}`)}>
          <Feather name="search" size={20} color="#6c757d" style={styles.searchIcon} />
          <Text style={styles.placeholderText}>Rechercher mosquée ou prédication...</Text>
        </TouchableOpacity>
  
        {/* Contenu principal */}
        <FlatList
          data={[ { key: 'predication' }, { key: 'mosque' }]}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ padding: SIZES.medium }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    searchBar: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
      borderRadius: 12,
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 4,
      elevation: 2,
    },
    searchIcon: {
      marginRight: 8,
    },
    placeholderText: {
      color: '#6c757d',
      fontSize: 16,
    },
  });
  
  export default Home;