import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Entre na sua conta com e-mail e senha</Text>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput 
          style={styles.input} 
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainTabs')} // Alterado aqui
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Prosseguir com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backButton: { marginBottom: 24, marginTop: 10 },
  backText: { fontSize: 24, color: '#333' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#006B5F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  form: { flex: 1 },
  label: { fontSize: 14, color: '#333', marginBottom: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, marginBottom: 24, fontSize: 16 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 24 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orText: { textAlign: 'center', color: '#666', marginBottom: 24 },
  googleButton: { borderWidth: 1, borderColor: '#ccc', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 24 },
  googleButtonText: { color: '#333', fontSize: 16, fontWeight: '600' },
  forgotPassword: { alignItems: 'center' },
  forgotText: { color: '#666', fontSize: 14 }
});