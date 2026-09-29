import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./predication.style";
import { COLORS, SIZES } from "../../../constants";
import PredicationCard from "../../common/cards/predication/PredicationCard";
import useFetch from "../../../hook/useFetch";
//import preddicationData from '../../../assets/Data/Predication.json'

const Predication = () => {
  const router = useRouter();
  const [selectedPredication, setSelectedPredication] = useState();
  const predication = "Predication";
  const handleCardPress = (id) => {
    router.push(`/predication-details/${id}`);
  };
  const { data, isloading, error } = useFetch("predication/all", {
    taille: 4,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Predication</Text>
        <TouchableOpacity
          onPress={() => router.push(`/voirplusPredi/${predication}`)}
        >
          <Text style={styles.headerBtn}>voir plus</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isloading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Une erreur c'est produite</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PredicationCard
                item={item}
                key={`predication-${item?.id}`}
                selectedPredication={selectedPredication}
                handleCardPress={() =>
                  router.push(`/predication-details/${item.id}`)
                }
              />
            )}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};
export default Predication;
