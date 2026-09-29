import {Text,View,SafeAreaView,ScrollView,ActivityIndicator, TouchableOpacity,RefreshControl,Image} from 'react-native';
import {useRouter,Stack,useLocalSearchParams} from 'expo-router';
import {COLORS, SIZES, icons} from '../../constants';
import useFetch from '../../hook/useFetch';
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'
import { useState } from 'react';
import styles from './company.style';
import { Ionicons } from '@expo/vector-icons';
import MosqueTab from '../../components/detailleMosque/mosqueTab/MosqueTab';
//import Apropos from '../../components/detailleMosque/apropos/Apropos';
import Apropos from '../../components/detailleMosque/apropos/Apropos';
import Priere from '../../components/detailleMosque/priere/Priere';
import Actualite from '../../components/detailleMosque/actualite/Actualite';
import utilities from '../../hook/utilities';

const tabs=["Prière","Actualité","Apropos"];

const MosqueDetails = () => {

  const params=useLocalSearchParams();
  const router=useRouter();
  const [refreshing,setRefreshing]=useState(false);
  const [activeTab,setActiveTab]=useState(tabs[0]);
  const onRefresh=()=>{}
  const {data,isloading,error,refetch}=useFetch(
    `mosque/find/${params.id}`,{
      
    },true);
    const {BearerKey,ipAdresse}=utilities();

    const displayTabContent = () => {
      switch (activeTab) {
        case "Prière":
          return (
            <Priere
              title='activeTab'
              data={data}
            />
          );
  
        case "Apropos":
          return (
            <Apropos 
            title='Apropos'
            data={data}
            />
          );
  
        case "Actualité":
          return (
            <Actualite
            title='activeTab'
            data={data}
            />
          );
  
        default:
          return null;
      }
    };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle:{ backgroundColor: '#f8b500' },
          headerShadowVisible:false,
          headerBackVisible:false,
          headerLeft:()=> (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
              ),
          
          headerTitle:''
        }} 
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
        >
          { isloading? (<ActivityIndicator size="large" color={COLORS.primary} />
          ): error?(<Text>Une erreur est survenu</Text>
          ): (
            <View style={{}}>
              <View style={styles.container}>
                {/* <View style={styles.logoBox}> */}
                  <Image
                    source={{uri:`http://${ipAdresse}:8080/muslimApi/v1/image/display/${data.id}/mosque`}}
                    style={styles.logoImage}
                    resizeMode='center'
                  />
                {/* </View> */}

                  <Text style={styles.jobTitleBox}> {data.nom} </Text>

                <View style={styles.companyInfoBox}>
                  <Text style={styles.companyName}>Localisation:{data.localisation?.pays}/{data.localisation?.ville} </Text>
                </View>
              </View>
              <MosqueTab 
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab} 
               />
               {displayTabContent()}
            </View>
          )

          }
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default MosqueDetails
