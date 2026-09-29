import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';

// Liste des URLs à exclure
const excludedUrls = [
  '/muslimApi/v1/authentication/authenticate',
  '/muslimApi/v1/utilisateur/nouveau/',
  '/muslimApi/v1/authentication/token/verify/',
];

// Fonction pour vérifier si une URL doit être exclue
const isExcluded = (url) => {
  return excludedUrls.some((excluded) => url.includes(excluded));
};

// Création d'une instance Axios
const axiosInterceptor = axios.create({
  baseURL: 'http://localhost:8080',
});

// Intercepteur pour ajouter le token
axiosInterceptor.interceptors.request.use(
  async (config) => {
    // Si l'URL est exclue, ne pas ajouter le token
    if (isExcluded(config.url)) {
      return config;
    }

    const token = "await AsyncStorage.getItem('access_token');"

    if (token) {
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc0ODg0Mjc0NiwiaWF0IjoxNzQ4MjM3OTQ2fQ.Pf2MoFSu5ysby3mBSbKFDQkUio48yGK4_md73vYeLL4`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
