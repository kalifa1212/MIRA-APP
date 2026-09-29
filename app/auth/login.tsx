import React, { useState,useEffect } from 'react';
import {router} from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { UtilisateurControllerApi,Configuration, AuthenticationRequest } from '../../hook/rn-client';
import axiosInterceptor from '../services';

const LoginScreen = () => {
  const config = new Configuration({});
  const utilisateurControllerApi = new UtilisateurControllerApi(config,config.basePath,axiosInterceptor);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authenticationRequest:  AuthenticationRequest={}
  

  const handleLogin = () => {
    // Ici, ajoute ta logique d'authentification
    if (email === '' || password === '') {
      console.log('Erreur', 'Veuillez remplir tous les champs');
    } else {
      authenticationRequest.login=email;
      authenticationRequest.password=password;
      utilisateurControllerApi.authentification(authenticationRequest)
      .then(res => {
       console.log("connexion successfully")
       router.replace("")
      })
      .catch(err => {
        console.log('erreur de connexion');
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f8b500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
