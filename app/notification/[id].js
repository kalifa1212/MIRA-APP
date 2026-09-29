import {Text,View,SafeAreaView,FlatList} from 'react-native';
import {useRouter,Stack,useLocalSearchParams} from 'expo-router';
import {COLORS, SIZES, icons} from '../../constants';
import NotificationCard from '../../components/common/cards/notification/NotificationCard';
import { Feather } from '@expo/vector-icons';


const Notifications = () => {

  
   const router=useRouter();
//     const {BearerKey,ipAdresse}=utilities();

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle:{ backgroundColor: '#f8b500' },
          headerShadowVisible:false,
          headerBackVisible:false,
          headerLeft:()=> (
            
            <Feather 
            name="arrow-left"
            size={24} 
            color="#000" 
            onPress={() => router.back()  }
             
        />
              ),
          
          headerTitle:'Notification'
        }} 
      />
      <>
      <View>
      <FlatList
            data={sampleNotifications}
            renderItem={({ item }) => (
              <NotificationCard notification={item} />
            )}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : `mosque-${index}`)}
            contentContainerStyle={{ padding: SIZES.medium }}
        />
        <NotificationCard notification={sampleNotifications} />
      </View>
      </>
    </SafeAreaView>
  )
}
const sampleNotifications = [
  {
    id: 1,
    title: "Prière du Vendredi",
    date: "15/02/2025",
    time: "13:30",
    description: "Rappel : La prière du vendredi aura lieu à 13h30. Soyez à l'heure.",
    isRead: false,
    isUpcoming: true,
    //icon: require('../../assets/icon.png'), // Remplace avec une icône réelle
  },
  {
    id: 2,
    title: "Événement caritatif",
    date: "20/02/2025",
    time: "18:00",
    description: "Ne manquez pas notre collecte de dons pour les nécessiteux.",
    isRead: true,
    isUpcoming: true,
    //icon: require('../../assets/icon.png'), // Remplace avec une icône réelle
  },
  {
    id: 3,
    title: "Événement caritatif",
    date: "20/02/2025",
    time: "18:00",
    description: "Ne manquez pas notre collecte de dons pour les nécessiteux.",
    isRead: true,
    isUpcoming: true,
    //icon: require('../../assets/icon.png'), // Remplace avec une icône réelle
  },
];
export default Notifications
