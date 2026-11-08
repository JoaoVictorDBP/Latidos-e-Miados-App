import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus afilhados</Text>
      </View>
      <View style={styles.filters}>
        <View style={[styles.chip, styles.chipActive]}><Text style={styles.chipTextActive}>Todos</Text></View>
        <View style={styles.chip}><Text style={styles.chipText}>Bolinha</Text></View>
        <View style={styles.chip}><Text style={styles.chipText}>Tieta</Text></View>
      </View>
      <ScrollView style={styles.feed}>
        <TouchableOpacity style={styles.post} onPress={() => navigation.navigate('Post')}>
          <View style={styles.postHeader}>
            <Image source={require('../assets/images/bolinha-card.jpg')} style={styles.avatar} />
            <Text style={styles.postAuthor}>Bolinha</Text>
            <Text style={styles.badge}>Saúde</Text>
            <Text style={styles.date}>02/11/2026</Text>
          </View>
          <Image source={require('../assets/images/post-bolinha-video.jpg')} style={styles.postImage} />
          <Text style={styles.postText}>Primeiro dia sem mancar depois do remédio novo! 🐾</Text>
          <View style={styles.postFooter}>
            <Text style={styles.comments}>💬 2 comentários</Text>
            <Ionicons name="heart-outline" size={22} color="#E67E22" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.post} onPress={() => navigation.navigate('Post')}>
          <View style={styles.postHeader}>
            <Image source={require('../assets/images/bolinha-card.jpg')} style={styles.avatar} />
            <Text style={styles.postAuthor}>Bolinha</Text>
            <Text style={styles.badge}>Dia a dia</Text>
            <Text style={styles.date}>29/10/2026</Text>
          </View>
          <Image source={require('../assets/images/post-bolinha.jpg')} style={styles.postImage} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, marginTop: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006B5F' },
  filters: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16, gap: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f0f0f0' },
  chipActive: { backgroundColor: '#E67E22' },
  chipText: { color: '#666', fontWeight: 'bold' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  feed: { flex: 1, paddingHorizontal: 16 },
  post: { marginBottom: 24 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  postAuthor: { fontWeight: 'bold', fontSize: 16, marginRight: 8 },
  badge: { backgroundColor: '#E0F2F1', color: '#006B5F', fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 'auto' },
  date: { color: '#999', fontSize: 12 },
  postImage: { width: '100%', height: 250, borderRadius: 12, marginBottom: 12 },
  postText: { fontSize: 14, color: '#333', marginBottom: 8 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  comments: { color: '#666', fontSize: 14 }
});