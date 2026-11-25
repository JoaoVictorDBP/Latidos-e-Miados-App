import React, { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import InstallScreen from './screens/InstallScreen';
import AppProviders from './context/AppProviders';
import useVoltarDoNavegador from './hooks/useVoltarDoNavegador';
import { deveMostrarInstalacao } from './utils/instalacaoPwa';
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
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textLight }}>
      {ABAS.map((aba) => (
        <Tab.Screen
          key={aba.name}
          name={aba.name}
          component={aba.component}
          options={{ tabBarLabel: aba.titulo, tabBarIcon: ({ color, size }) => <Ionicons name={aba.icone} color={color} size={size} /> }}
        />
      ))}
    </Tab.Navigator>
  );
}

// No computador, a versão web fica com largura de celular, centralizada
function MolduraWeb({ children }) {
  if (Platform.OS !== 'web') return children;
  return (
    <View style={styles.webFundo}>
      <View style={styles.webCelular}>{children}</View>
    </View>
  );
}

const navigationRef = createNavigationContainerRef();

export default function App() {
  const sincronizarVoltar = useVoltarDoNavegador(navigationRef);
  // Na web aberta pelo navegador, convida a instalar o app antes de começar
  const [mostrarInstalacao, setMostrarInstalacao] = useState(deveMostrarInstalacao);

  if (mostrarInstalacao) {
    return (
      <MolduraWeb>
        <SafeAreaProvider>
          <InstallScreen onContinuar={() => setMostrarInstalacao(false)} />
        </SafeAreaProvider>
      </MolduraWeb>
    );
  }

  return (
    <MolduraWeb>
      <SafeAreaProvider>
        <AppProviders>
          <NavigationContainer
            ref={navigationRef}
            documentTitle={{ formatter: () => 'Latidos & Miados' }}
            onReady={sincronizarVoltar}
            onStateChange={sincronizarVoltar}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {Object.entries(TELAS).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </AppProviders>
      </SafeAreaProvider>
    </MolduraWeb>
  );
}

const styles = StyleSheet.create({
  webFundo: { flex: 1, backgroundColor: colors.surface, alignItems: 'center' },
  webCelular: { flex: 1, width: '100%', maxWidth: 430, backgroundColor: colors.background, overflow: 'hidden', borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border },
});
