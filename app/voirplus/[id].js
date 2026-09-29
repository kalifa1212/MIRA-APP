import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View,ScrollView } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'
import { Feather } from '@expo/vector-icons';

import  ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import MosqueCard from '../../components/common/cards/mosque/MosqueCard'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'
import utilities from '../../hook/utilities'
import mosqueData from '../../assets/Data/Mosque.json'

let test=0;
const VoirPlus = () => {
   
    const {BearerKey,ipAdresse}=utilities();
     const params = useLocalSearchParams();
     const router = useRouter()

//---------------------------------------------------------------------------------
const [mosques, setMosques] = useState([]);
const [page, setPage] = useState(0); // Commence à 0 car API utilise une pagination à partir de 0
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false);

// Fonction pour récupérer les données depuis l'API
const fetchMosques = async () => {
    if (loading || endReached) return;

    setLoading(true);
    try {
        const response = await fetch(`http://${ipAdresse}:8080/muslimApi/v1/mosque/find/all/?page=${page}&taille=5`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + BearerKey
            }
        });

        const data = await response.json();
       // console.log("Liste des mosque avant ",mosques)
        if (data.content.length > 0) {
            setMosques(prev => [...prev, ...data.content]); // Ajouter les nouvelles mosquées
            //setMosques(mosques.concat(data.content));
            setPage(prev => prev + 1); // Passer à la page suivante
            console.log("Liste des mosque apres ajout",mosques)
        } else {
            setEndReached(true); // Plus de pages disponibles
        }
    } catch (error) {
        console.error("Erreur lors du chargement des mosquées", error);
    }
    setLoading(false);
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
};

// Charger la première page au montage
useEffect(() => {
    fetchMosques();
}, []);

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: '#f8b500' },
                headerShadowVisible: false,
                headerLeft: () => (
                   
                    <Feather 
                            name="arrow-left"
                            size={24} 
                            color="#000" 
                            onPress={() => router.back()  }
                             
                        />
                ),
                headerTitle:"Liste "+params.id
            }}
        />
        
        <ScrollView 
    contentContainerStyle={{ padding: SIZES.medium }} 
    onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !loading) {
            fetchMosques();
        }
    }}
    scrollEventThrottle={400} // Réduit la fréquence des appels
>
    {mosques.map((item) => (
        <MosqueCard
            key={item.id}
            mosque={item}
            handleNavigate={() => router.push(`/mosque-details/${item.id}`)}
        />
    ))}

    {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
</ScrollView>
    </SafeAreaView>
);
}

export default VoirPlus