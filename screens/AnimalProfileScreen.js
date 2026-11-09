import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AnimalProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/images/bolinha.jpg')} 
            style={styles.image} 
          />
          <TouchableOpacity style={[styles.backButton, { top: insets.top + 12 }]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>Bolinha</Text>
          <Text style={styles.subtitle}>Cão • 9 anos • 3 padrinhos</Text>
          
          <Text style={styles.sectionTitle}>História</Text>
          <Text style={styles.description}>
            Resgatado em 2017 na beira da estrada, com a pata machucada. Hoje vive no canil 12, adora tomar sol de manhã e é o mais dorminhoco da turma.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerPrice}>A partir de R$ 10/mês</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('DonationValue')}>
          <Text style={styles.primaryButtonText}>Apadrinhar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 350, resizeMode: 'cover' },
  backButton: { position: 'absolute', left: 16, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 24, fontWeight: 'bold' },
  content: { padding: 24 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#006B5F' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  description: { fontSize: 14, color: '#444', lineHeight: 22 },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff', alignItems: 'center' },
  footerPrice: { color: '#666', marginBottom: 12 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, width: '100%', borderRadius: 30, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});