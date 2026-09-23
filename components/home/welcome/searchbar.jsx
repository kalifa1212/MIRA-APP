import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Pour les icônes modernes

const SearchBar = ({
  onSearch,
  placeholder = "Rechercher une mosquée ou prédication",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.error("ok******");
    if (onSearch) {
      onSearch(searchQuery);
      console.log("ok******");
    }
  };

  return (
    <View style={styles.container}>
      {/* Icône de recherche */}
      <Feather
        name="search"
        size={20}
        color="#6c757d"
        style={styles.searchIcon}
      />

      {/* Champ de recherche */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />

      {/* Bouton Filtre */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => alert("Ouvrir les filtres")}
      >
        <Feather name="filter" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Ombre Android
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
  },
});

export default SearchBar;
