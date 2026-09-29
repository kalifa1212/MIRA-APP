# 📱 MIRA - Muslim Information Resources and Assistance  

MIRA est une application mobile développée avec **React Native Expo** pour fournir aux musulmans des ressources et une assistance précieuse, notamment des horaires de prière, la localisation des mosquées, des notifications importantes et bien plus encore.  

---

## 🚀 Fonctionnalités  

✅ Localisation des mosquées 📍  
✅ Horaires de prière dynamiques 🕋  
✅ Suivi et notifications pour les mosquées ⏰  
## 🚀 Fonctionnalités a venir
✅ Streaming audio et vidéo de contenus islamiques 🎧📹  
✅ Authentification sécurisée 🔐  
✅ Exportation et importation de données 📂  

---

## 🏗️ Technologies utilisées  

- **React Native** avec **Expo SDK**  
- **TypeScript / JavaScript**  
- **Redux / Context API** (si utilisé pour la gestion d'état)  
- **MIRA API** (si utilisé pour l'authentification et la base de données)  
- **Expo router** pour la gestion des écrans  
- **EAS (Expo Application Services)** pour la génération de l'APK  

---

## 🛠️ Installation et configuration  

### 1️⃣ **Cloner le projet**  

```sh
git clone https://github.com/kalifa1212/MIRA.git
cd mira-app
```

### 2️⃣ **Installer les dépendances**  

```sh
npm install
# ou
yarn install
```


---

## ▶️ Lancer l’application  

📱 **Pour démarrer l'application sur un émulateur ou un appareil physique** :  

```sh
npm start
# ou
expo start
```

Ensuite, scanne le QR Code affiché dans le terminal avec l'application Expo Go sur ton téléphone.  

📦 **Pour tester sur un appareil physique sans Expo Go** :  

```sh
eas build --profile preview --platform android
```

---

## 🔐 Authentification  

L'application utilise une authentification **Email + Mot de passe**. Après la connexion, un token JWT est généré et utilisé pour sécuriser les requêtes API.  

---

## 📡 API et Backend  

MIRA utilise l'API **MIRA-API** pour récupérer et gérer les données des utilisateurs, des mosquées et des notifications.  

📌 **Endpoints non sécurisés** :  
- `/muslimApi/v1/authentication/authenticate` → Authentification utilisateur  
- `/logout` → Déconnexion  

📌 **Endpoints sécurisés** (JWT requis) :  
- `/mosques` → Liste des mosquées  
- `/Predication` → Horaires de prière  
- `/notifications` → Notifications globales  

---

## 🎨 Design et UI  

L'interface de MIRA suit un design épuré et intuitif inspiré Utilisant **CSS** et **JavaScript** pour React Native.  

---

## 🔄 Déploiement  

L’application est hébergée et buildée avec **Expo EAS** :  

1. **Générer l'APK pour Android** :  

```sh
eas build --platform android
```

2. **Générer l'IPA pour iOS** (besoin d’un compte Apple Developer) :  

```sh
eas build --platform ios
```

3. **Publier une mise à jour OTA (Over The Air)** :  

```sh
eas update
```

---

## 🛠️ À faire (Roadmap)  

🚧 **Prochaines améliorations prévues** :  
- [ ] Implémentation des notifications push via **Expo Notifications**  
- [ ] Ajout du mode sombre 🌙  
- [ ] Traduction multilingue (Français, Anglais, Arabe) 🌍  
- [ ] Ajout de la fonctionnalité de dons intégrés 💰  

---

## 👥 Contributeurs  

- **KALIFA** - Développeur principal 🚀  
- **H Technologies** - Fournisseur officiel et sponsor  

Si tu veux contribuer, n’hésite pas à faire un **fork** et proposer une **pull request** !  

---

## 📜 Licence  

Ce projet est sous licence **MIT**. Tu peux l'utiliser et le modifier librement sous réserve de mentionner l’auteur original.  

📩 **Contact** : [kalifakalifh12@gmail.com](mailto:kalifakalifh12@gmail.com)  

---

✍️ **Powered by H Technologies** | 🤝 _Fait avec ❤️ pour la communauté musulmane_
