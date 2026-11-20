import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import { typography } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <Screen edges={['left', 'right', 'bottom']}>
      <Image source={require('../assets/images/bolinha.jpg')} style={styles.heroImage} />

      <View style={styles.content}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} accessibilityLabel="Logo Latidos & Miados" />
        <Text style={styles.title}>Latidos & Miados</Text>
        <Text style={styles.subtitle}>Apadrinhe um animal resgatado e acompanhe o dia a dia dele pelo app.</Text>

        <Button title="Conhecer os animais" onPress={() => navigation.navigate('MainTabs')} style={styles.button} />
        <Button title="Já tenho uma conta" variant="ghost" onPress={() => navigation.navigate('Login')} style={styles.button} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroImage: { width: '100%', height: '55%', resizeMode: 'cover' },
  content: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 49, height: 54, marginBottom: 8 },
  title: { ...typography.pageTitle, marginBottom: 8 },
  subtitle: { ...typography.subtitle, textAlign: 'center', marginBottom: 20 },
  button: { width: '100%', marginBottom: 8 },
});
