import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import utilities from '../../../../hook/utilities';
import { COLORS, SIZES } from './constant';

const MosqueCard = ({ mosque, handleNavigate }) => {
  const { BearerKey, ipAdresse } = utilities();

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [followed, setFollowed] = useState(false);

  const toggleLike = () => setLiked(!liked);
  const toggleFavorite = () => setFavorited(!favorited);
  const toggleFollow = () => setFollowed(!followed);
  const location =()=>{

  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `http://${ipAdresse}:8080/muslimApi/v1/image/display/${mosque.id}/mosque` }}
        resizeMode='cover'
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{mosque.nom}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {mosque.description ? mosque.description : "Aucune description disponible"}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          {/* Localisation */}
          <TouchableOpacity onPress={location} style={styles.iconBtn}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity> 

          {/* Prière vendredi */}
          <View style={styles.vendrediInline}>
          <Text style={styles.vendrediLabel}>Prière vendredi</Text>
            <Text style={[styles.vendrediText, { color: mosque.isVendredi ? COLORS.green : COLORS.red }]}>
              {mosque.isVendredi ? " Oui" : " Non"}
            </Text>
           
          </View>

         

          {/* Actions : like, fav, follow */}
          <View style={styles.actionsInline}>
            {/* <TouchableOpacity onPress={toggleLike} style={styles.iconBtn}>
              <Ionicons name={liked ? "heart" : "heart-outline"} size={20} color={liked ? COLORS.red : COLORS.gray} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={toggleFavorite} style={styles.iconBtn}>
              <Ionicons name={favorited ? "bookmark" : "bookmark-outline"} size={20} color={favorited ? COLORS.primary : COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFollow} style={styles.iconBtn}>
              <Ionicons name="add" size={28} color={followed ? COLORS.primary : COLORS.gray} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: COLORS.white,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: SIZES.medium,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: SIZES.medium,
  },
  header: {
    marginBottom: SIZES.small,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.blue,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.medium,
  },
  location: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
  vendrediContainer: {
    alignItems: 'center',
  },
  vendrediText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vendrediLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.small,
    gap: 12,
  },
  iconBtn: {
    padding: 6,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.medium,
    gap: 10,
  },
  
  actionsInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  
  vendrediInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  locationInline: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
  },
});

export default MosqueCard;
