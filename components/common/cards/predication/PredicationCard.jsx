import React, { useState } from 'react';
import {View ,Text,TouchableOpacity,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../mosque/constant';
//import styles from './predicationCard.style';

const PredicationCard = ({ item, selectedPredication, handleCardPress }) => {
    const [liked, setLiked] = useState(false);
  
    const toggleLike = () => setLiked(!liked);
  
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={handleCardPress}
        activeOpacity={0.85}
      >
        {/* Haut : type + like */}
        <View style={styles.header}>
          <Text style={styles.type}>{item.type}</Text>
          <TouchableOpacity onPress={toggleLike} style={styles.iconBtn}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={20}
              color={liked ? COLORS.red : COLORS.gray}
            />
          </TouchableOpacity>
        </View>
  
        {/* Thème */}
        <Text style={styles.title} numberOfLines={1}>
          {item.theme}
        </Text>
  
        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description ? item.description : "Aucune description disponible"}
        </Text>
  
        {/* Bas : date */}
        <Text style={styles.date}>{item.date}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = {
    container: {
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 4,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    type: {
      fontSize: 13,
      fontWeight: "bold",
      //color: "#f8b500",
      color: COLORS.primaryLight,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    iconBtn: {
      padding: 4,
      borderRadius: 20,
      backgroundColor: "#f5f5f5",
    },
    title: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#222",
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    date: {
      fontSize: 12,
      color: "#999",
      textAlign: "right",
      fontStyle: "italic",
    },
  };
  
  export default PredicationCard;
  
