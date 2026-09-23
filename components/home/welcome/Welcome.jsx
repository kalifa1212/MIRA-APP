import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import utilities from "../../../hook/utilities";
import MosqueCard from "../../../components/common/cards/mosque/MosqueCard";
import PredicationCard from "../../../components/common/cards/predication/PredicationCard";
import { COLORS } from "../../../constants";

const Welcome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState("mosque");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriterion, setFilterCriterion] = useState("nom");
  const [mosques, setMosques] = useState([]);
  const [predications, setPredications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listOpacity] = useState(new Animated.Value(0)); // Opacité de la liste

  const router = useRouter();
  const { BearerKey, ipAdresse } = utilities();
  let endpoint =
    searchType === "mosque"
      ? `mosque/find/${filterCriterion}/`
      : `predication/find/${filterCriterion}/`;

  const resetSearch = () => {
    setSearchQuery("");
    setSearchType("mosque");
    setFilterCriterion("nom");
    setMosques([]);
    setPredications([]);
    setLoading(false);
    setDataLoaded(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setDataLoaded(false);

    try {
      const response = await fetch(
        `http://${ipAdresse}:8080/muslimApi/v1/${endpoint}${searchQuery}?page=0&taille=2`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + BearerKey },
        },
      );
      const data = await response.json();

      if (searchType === "mosque") {
        setMosques(data.content || []);
      } else {
        setPredications(data.content || []);
      }

      setDataLoaded(true);
      // Animation pour afficher la liste des résultats
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error("Erreur API:", error);
      Alert.alert("Erreur", "Impossible de récupérer les données.");
    } finally {
      setLoading(false);
    }
  };

  const navigation = "nave";
  const handleNavigateToResults = () => {
    router.push({
      pathname: `/search/${navigation}`, // Ex: "/search/mosque"
      params: {
        searchType,
        data: JSON.stringify(searchType === "mosque" ? mosques : predications), // Convertir en string pour éviter les problèmes
        loading,
      },
    });
  };

  const renderItem = ({ item }) => {
    if (searchType === "mosque") {
      return (
        <MosqueCard
          mosque={item}
          handleNavigate={() => router.push(`/mosque-details/${item.id}`)}
        />
      );
    } else if (searchType === "predication") {
      return (
        <PredicationCard
          item={item}
          handleCardPress={() => router.push(`/predication-details/${item.id}`)}
        />
      );
    }
    return null;
  };

  // Animation pour le modal
  const [modalTranslateY] = useState(new Animated.Value(300)); // Initial position off-screen

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(modalTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalTranslateY, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="#6c757d"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Rechercher"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton} onPress={openModal}>
          <Feather name="filter" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetSearch}>
          <Feather name="refresh-cw" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: modalTranslateY }] },
          ]}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir un filtre</Text>
            <TouchableOpacity
              style={[
                styles.optionButton,
                searchType === "mosque" && styles.optionButtonSelected,
              ]}
              onPress={() => {
                setSearchType("mosque");
                setFilterCriterion("nom");
                closeModal();
              }}
            >
              <Text style={styles.optionText}>
                🕌 Rechercher dans les Mosquées
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                searchType === "predication" && styles.optionButtonSelected,
              ]}
              onPress={() => {
                setSearchType("predication");
                setFilterCriterion("nom");
                closeModal();
              }}
            >
              <Text style={styles.optionText}>
                📖 Rechercher dans les Prédications
              </Text>
            </TouchableOpacity>
            {searchType === "mosque" && (
              <>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    filterCriterion === "nom" && styles.optionButtonSelected,
                  ]}
                  onPress={() => {
                    setFilterCriterion("nom");
                    closeModal();
                  }}
                >
                  <Text style={styles.optionText}>Rechercher par Nom</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    filterCriterion === "localisation" &&
                      styles.optionButtonSelected,
                  ]}
                  onPress={() => {
                    setFilterCriterion("localisation");
                    closeModal();
                  }}
                >
                  <Text style={styles.optionText}>Rechercher par Ville</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    filterCriterion === "vendredi" &&
                      styles.optionButtonSelected,
                  ]}
                  onPress={() => {
                    setFilterCriterion("vendredi");
                    closeModal();
                  }}
                >
                  <Text style={styles.optionText}>
                    Rechercher par Mosquée du Vendredi
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {searchType === "predication" && (
              <>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    filterCriterion === "theme" && styles.optionButtonSelected,
                  ]}
                  onPress={() => {
                    setFilterCriterion("theme");
                    closeModal();
                  }}
                >
                  <Text style={styles.optionText}>Rechercher par Thème</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    filterCriterion === "type" && styles.optionButtonSelected,
                  ]}
                  onPress={() => {
                    setFilterCriterion("type");
                    closeModal();
                  }}
                >
                  <Text style={styles.optionText}>Rechercher par Type</Text>
                </TouchableOpacity>
              </>
            )}
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />
      ) : (
        dataLoaded && (
          <TouchableOpacity
            onPress={handleNavigateToResults}
            style={styles.searchButton}
          >
            <Text style={styles.searchButtonText}>Voir les résultats</Text>
          </TouchableOpacity>
        )
      )}

      {/* Liste des résultats */}
      <Animated.FlatList
        data={searchType === "mosque" ? mosques : predications}
        keyExtractor={(item) => (item.id ? item.id.toString() : item.name)}
        renderItem={renderItem}
        style={{ opacity: listOpacity }} // L'animation de la liste
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16, color: "#333" },
  filterButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  resetButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5 },
  searchButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  searchButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loader: { marginTop: 15 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  optionButton: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  optionButtonSelected: { backgroundColor: "#007bff" },
  optionText: { fontSize: 16, color: "#333" },
  closeButton: { marginTop: 15 },
  closeButtonText: { fontSize: 16, color: "red", fontWeight: "bold" },
});

export default Welcome;
