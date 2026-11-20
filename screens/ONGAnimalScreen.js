import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import PostHeader from '../components/PostHeader';
import { ANIMAL_ONG } from '../data/animais';
import { colors, typography } from '../theme';

export default function ONGAnimalScreen({ navigation, route }) {
  const animal = route.params?.animal ?? ANIMAL_ONG;

  return (
    <Screen>
      <ScreenHeader
        title={animal.nome}
        right={
          <TouchableOpacity onPress={() => navigation.navigate('ONGEditAnimal', { animal })}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Button title={'+ Novo post para ' + animal.nome} style={styles.newPostButton} />

        <View style={styles.post}>
          <PostHeader avatar={animal.foto} autor={animal.nome} categoria="Dia a dia" data="24/10/2026" />
          <Image source={require('../assets/images/post-zeca.jpg')} style={styles.postImage} />
          <Text style={styles.postText}>Dormiu a tarde inteira em cima do saco de ração 😴</Text>
          <Text style={typography.caption}>💬 0 comentários</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  editText: { color: colors.primary, fontWeight: 'bold' },
  content: { padding: 16 },
  newPostButton: { paddingVertical: 12, marginBottom: 24 },
  post: { marginBottom: 24, borderWidth: 1, borderColor: colors.border, padding: 16, borderRadius: 12 },
  postImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  postText: { ...typography.body, marginBottom: 8 },
});
