import React, { useState, useEffect } from 'react';
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
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {Stack,useRouter } from 'expo-router';
import MosqueCard from '../../components/common/cards/mosque/MosqueCard';
import utilities from '../../hook/utilities';
import PredicationCard from '../../components/common/cards/predication/PredicationCard';
import { COLORS } from '../../constants';

// ...imports identiques
const GlobalSearch = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('mosque');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriterion, setFilterCriterion] = useState('nom');
  const [mosques, setMosques] = useState([]);
  const [predications, setPredications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listOpacity] = useState(new Animated.Value(0));

  const router = useRouter();
  const { BearerKey, ipAdresse } = utilities();
  let endpoint = searchType === 'mosque' 
    ? `mosque/find/${filterCriterion}/` 
    : `predication/find/${filterCriterion}/`;

  const resetSearch = () => {
    setSearchQuery('');
    setSearchType('mosque');
    setFilterCriterion('nom');
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
          method: 'GET',
          headers: { Authorization: 'Bearer ' + BearerKey },
        }
      );
      const data = await response.json();
      if (searchType === 'mosque') setMosques(data.content || []);
      else setPredications(data.content || []);
      setDataLoaded(true);
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Erreur API:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les données.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    if (searchType === 'mosque') {
      return <MosqueCard mosque={item} handleNavigate={() => router.push(`/mosque-details/${item.id}`)} />;
    } else if (searchType === 'predication') {
      return <PredicationCard item={item} handleCardPress={() => router.push(`/predication-details/${item.id}`)} />;
    }
    return null;
  };

  const [modalTranslateY] = useState(new Animated.Value(300));

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#f8b500' },
          headerShadowVisible: true,
          headerTintColor: '#000',
          headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          headerTitle: "Recherche Globale",
        }}
      />

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#6c757d" style={styles.searchIcon} />
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
        </View>
      </View>

      <Modal transparent visible={modalVisible} onRequestClose={closeModal}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: modalTranslateY }] }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir un filtre</Text>
            <TouchableOpacity style={[styles.optionButton, searchType === 'mosque' && styles.optionButtonSelected]} onPress={() => { setSearchType('mosque'); setFilterCriterion('nom'); closeModal(); }}>
              <Text style={styles.optionText}>🕌 Mosquées</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, searchType === 'predication' && styles.optionButtonSelected]} onPress={() => { setSearchType('predication'); setFilterCriterion('nom'); closeModal(); }}>
              <Text style={styles.optionText}>📖 Prédications</Text>
            </TouchableOpacity>
            {searchType === 'mosque' && (
              <>
                <TouchableOpacity style={[styles.optionButton, filterCriterion === 'nom' && styles.optionButtonSelected]} onPress={() => { setFilterCriterion('nom'); closeModal(); }}>
                  <Text style={styles.optionText}>Nom</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionButton, filterCriterion === 'localisation' && styles.optionButtonSelected]} onPress={() => { setFilterCriterion('localisation'); closeModal(); }}>
                  <Text style={styles.optionText}>Ville</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionButton, filterCriterion === 'vendredi' && styles.optionButtonSelected]} onPress={() => { setFilterCriterion('vendredi'); closeModal(); }}>
                  <Text style={styles.optionText}>Mosquée du Vendredi</Text>
                </TouchableOpacity>
              </>
            )}
            {searchType === 'predication' && (
              <>
                <TouchableOpacity style={[styles.optionButton, filterCriterion === 'theme' && styles.optionButtonSelected]} onPress={() => { setFilterCriterion('theme'); closeModal(); }}>
                  <Text style={styles.optionText}>Thème</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionButton, filterCriterion === 'type' && styles.optionButtonSelected]} onPress={() => { setFilterCriterion('type'); closeModal(); }}>
                  <Text style={styles.optionText}>Type</Text>
                </TouchableOpacity>
              </>
            )}
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>

      {loading && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      <Animated.FlatList
        data={searchType === 'mosque' ? mosques : predications}
        keyExtractor={(item) => item.id ? item.id.toString() : item.name}
        renderItem={renderItem}
        style={{ opacity: listOpacity }}
        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color={COLORS.primary} /> : null}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, backgroundColor: COLORS.primary },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  searchBarContainer: { padding: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, elevation: 3 },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, height: 45, fontSize: 16 },
  filterButton: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 6, marginLeft: 5 },
  resetButton: { backgroundColor: '#6c757d', padding: 10, borderRadius: 6, marginLeft: 5 },
  searchButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 20, marginBottom: 10 },
  searchButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loader: { marginTop: 15 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '85%', backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  optionButton: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8, marginVertical: 5, width: '100%', alignItems: 'center' },
  optionButtonSelected: { backgroundColor: COLORS.primary },
  optionText: { fontSize: 16, color: '#333' },
  closeButton: { marginTop: 15 },
  closeButtonText: { fontSize: 16, color: 'red', fontWeight: 'bold' },
});

export default GlobalSearch;
