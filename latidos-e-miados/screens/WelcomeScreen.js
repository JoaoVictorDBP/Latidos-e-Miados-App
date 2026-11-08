import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem simulada do cachorro - Substituir por URL real ou require('./path') */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop' }} 
        style={styles.heroImage} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Latidos & Miados</Text>
        <Text style={styles.subtitle}>Apadrinhe um animal resgatado e acompanhe o dia a dia dele pelo app.</Text>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.primaryButtonText}>Conhecer os animais</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroImage: { width: '100%', height: '55%', resizeMode: 'cover' },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006B5F', marginBottom: 8 }, // Cor verde escura da logo
  subtitle: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 32 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, width: '100%', borderRadius: 30, alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { paddingVertical: 16, width: '100%', alignItems: 'center' },
  secondaryButtonText: { color: '#666', fontSize: 16, fontWeight: '600' }
});