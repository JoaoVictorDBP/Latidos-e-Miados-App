import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import AnimalProfileScreen from './screens/AnimalProfileScreen';
import DonationValueScreen from './screens/DonationValueScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import TransparenciaScreen from './screens/TransparenciaScreen';
import ManageSponsorshipScreen from './screens/ManageSponsorshipScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ONGDashboardScreen from './screens/ONGDashBoardScreen';

// Telas novas
import PaymentScreen from './screens/PaymentScreen';
import PostScreen from './screens/PostScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import CertificatesScreen from './screens/CertificatesScreen';
import ScheduleVisitScreen from './screens/ScheduleVisitScreen';
import ONGNewPostScreen from './screens/ONGNewPostScreen';
import ONGAnimalScreen from './screens/ONGAnimalScreen';
import ONGNewAnimalScreen from './screens/ONGNewAnimalScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#E67E22', tabBarInactiveTintColor: '#999' }}>
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarLabel: 'Início', tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="MeusAfilhados" component={FeedScreen} options={{ tabBarLabel: 'Meus afilhados', tabBarIcon: () => <Text>🐾</Text> }} />
      <Tab.Screen name="Transparencia" component={TransparenciaScreen} options={{ tabBarLabel: 'Transparência', tabBarIcon: () => <Text>👁️</Text> }} />
      <Tab.Screen name="PerfilTab" component={UserProfileScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="AnimalProfile" component={AnimalProfileScreen} />
        <Stack.Screen name="DonationValue" component={DonationValueScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="ManageSponsorship" component={ManageSponsorshipScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="Certificates" component={CertificatesScreen} />
        <Stack.Screen name="ScheduleVisit" component={ScheduleVisitScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="ONGDashboard" component={ONGDashboardScreen} />
        <Stack.Screen name="ONGNewPost" component={ONGNewPostScreen} />
        <Stack.Screen name="ONGAnimal" component={ONGAnimalScreen} />
        <Stack.Screen name="ONGNewAnimal" component={ONGNewAnimalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}