import React, { useEffect, useState } from "react";
import { 
  Text, View, SafeAreaView, ScrollView, ActivityIndicator, 
  RefreshControl, TouchableOpacity, StyleSheet 
} from 'react-native';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { COLORS, SIZES, icons } from '../../constants';
import { PredicationControllerApi,Configuration } from "../../hook/rn-client";
import axios from 'axios';
import utilities from "../../hook/utilities";
import { Ionicons } from '@expo/vector-icons';
import axiosInterceptor from "../services";

const PredicationDetails = () => {

//--test
const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const config = new Configuration({});
  const predicationControllerApi = new PredicationControllerApi(config);
  const params = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [mosque, setMosque] = useState([]);
  const [imam, setImam] = useState([]);

  useEffect(() => {
    predicationControllerApi.findByIdPredication(params.id)
    .then(res => {
      setData(res.data); // ou res.data selon ta réponse
      setIsloading(false);
    })
    .catch(err => {
      setError(err);
      setIsloading(false);
    });

  }, []);

  const handleDownloadPredication = () => {

  };
  
  const handleWatchLive = () => {

  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#f8b500' },
          headerShadowVisible: true,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: "data.theme",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollViewContent}
      >
        {isloading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>Une erreur est survenue</Text>
        ) : (
          <View style={styles.contentWrapper}>
            <Text style={styles.predicationTitle}>🎙️ Thème : {data.theme}</Text>

            <View style={styles.card}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonDownload} onPress={handleDownloadPredication}>
                  <Ionicons name="download-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Télécharger</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLive} onPress={handleWatchLive}>
                  <Ionicons name="play-circle-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Suivre en direct</Text>
                </TouchableOpacity>
              </View>
              <DetailRow label="Type" value={data.type} />
              <DetailRow label="Date" value={data.date} />
              <DetailRow label="Prédicateur" value={imam.nom} />
              <DetailRow label="Lieu" value={mosque.nom} />
              <DetailRow label="Informations" value={data.info} />
            </View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value || '—'}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontWeight: '500',
  },
  contentWrapper: {
    marginTop: 20,
  },
  predicationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.gray,
    flex: 1.5,
    textAlign: 'right',
  },
});

export default PredicationDetails;

