import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
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

import PaymentScreen from './screens/PaymentScreen';
import PostScreen from './screens/PostScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import CertificatesScreen from './screens/CertificatesScreen';
import ScheduleVisitScreen from './screens/ScheduleVisitScreen';
import MyVisitsScreen from './screens/MyVisitsScreen';
import MemorialChoiceScreen from './screens/MemorialChoiceScreen';
import MemorialWallScreen from './screens/MemorialWallScreen';
import ONGNewPostScreen from './screens/ONGNewPostScreen';
import ONGAnimalScreen from './screens/ONGAnimalScreen';
import ONGAnimalFormScreen from './screens/ONGAnimalFormScreen';
import HelpScreen from './screens/HelpScreen';
import AppProviders from './context/AppProviders';
import { colors } from './theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ABAS = [
  { name: 'Inicio', component: HomeScreen, titulo: 'Início', icone: 'home-outline' },
  { name: 'MeusAfilhados', component: FeedScreen, titulo: 'Meus afilhados', icone: 'heart-outline' },
  { name: 'Transparencia', component: TransparenciaScreen, titulo: 'Transparência', icone: 'eye-outline' },
  { name: 'PerfilTab', component: UserProfileScreen, titulo: 'Perfil', icone: 'person-outline' },
];

const TELAS = {
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
  MainTabs: MainTabs,
  AnimalProfile: AnimalProfileScreen,
  DonationValue: DonationValueScreen,
  Payment: PaymentScreen,
  Confirmation: ConfirmationScreen,
  ManageSponsorship: ManageSponsorshipScreen,
  Notifications: NotificationsScreen,
  NotificationSettings: NotificationSettingsScreen,
  Certificates: CertificatesScreen,
  ScheduleVisit: ScheduleVisitScreen,
  MyVisits: MyVisitsScreen,
  MemorialChoice: MemorialChoiceScreen,
  MemorialWall: MemorialWallScreen,
  Post: PostScreen,
  ONGDashboard: ONGDashboardScreen,
  ONGNewPost: ONGNewPostScreen,
  ONGAnimal: ONGAnimalScreen,
  ONGNewAnimal: ONGAnimalFormScreen,
  ONGEditAnimal: ONGAnimalFormScreen,
  Help: HelpScreen,
};

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View accessibilityRole="tablist">
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      {ABAS.map((aba) => (
        <Tab.Screen
          key={aba.name}
          name={aba.name}
          component={aba.component}
          options={{
            tabBarLabel: aba.titulo,
            tabBarAccessibilityLabel: aba.titulo,
            tabBarIcon: ({ color, size }) => <Ionicons name={aba.icone} color={color} size={size} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {Object.entries(TELAS).map(([name, component]) => (
              <Stack.Screen key={name} name={name} component={component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </AppProviders>
    </SafeAreaProvider>
  );
}
