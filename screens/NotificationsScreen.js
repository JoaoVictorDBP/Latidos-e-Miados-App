import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} /></TouchableOpacity>
        <Text style={styles.title}>Notificações</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationSettings')}><Ionicons name="settings-outline" size={24} color="#333" /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.dateLabel}>Hoje</Text>
        <View style={styles.notificationCard}>
          <Text style={styles.icon}>🐾</Text>
          <Text style={styles.notificationText}><Text style={styles.bold}>Bolinha</Text> tem um vídeo novo!</Text>
        </View>
        <View style={styles.notificationCard}>
          <Text style={styles.icon}>🩺</Text>
          <Text style={styles.notificationText}>Resultado da consulta da <Text style={styles.bold}>Tieta</Text></Text>
        </View>
        <Text style={styles.dateLabel}>Esta semana</Text>
        <View style={styles.notificationCard}>
          <Text style={styles.icon}>🎪</Text>
          <Text style={styles.notificationText}>Bazar da ONG no sábado, 08/11, às 9h</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backText: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 16 },
  dateLabel: { fontSize: 14, color: '#666', marginTop: 16, marginBottom: 8 },
  notificationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF5EB', padding: 16, borderRadius: 12, marginBottom: 12 },
  icon: { fontSize: 20, marginRight: 12 },
  notificationText: { fontSize: 14, color: '#333', flex: 1 },
  bold: { fontWeight: 'bold' }
});