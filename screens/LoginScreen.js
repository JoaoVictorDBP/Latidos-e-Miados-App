import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Entre na sua conta com e-mail e senha</Text>

      <ScrollView style={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <View>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setSenhaVisivel(!senhaVisivel)} accessibilityLabel={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}>
            <Ionicons name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainTabs')} // Alterado aqui
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('MainTabs')}>
          <Image source={require('../assets/images/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Prosseguir com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword', { email })}>
          <Text style={styles.forgotText}>Esqueci a senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.forgotText}>Não tem uma conta? <Text style={styles.signUpLinkBold}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backButton: { marginBottom: 24 },
  backText: { fontSize: 24, color: '#333' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#006B5F', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  form: { flex: 1 },
  label: { fontSize: 14, color: '#333', marginBottom: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, marginBottom: 24, fontSize: 16 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 24 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orText: { textAlign: 'center', color: '#666', marginBottom: 24 },
  googleButton: { borderWidth: 1, borderColor: '#ccc', paddingVertical: 16, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  googleIcon: { width: 20, height: 20, marginRight: 10 },
  passwordInput: { paddingRight: 32 },
  eyeButton: { position: 'absolute', right: 0, top: 6, padding: 4 },
  googleButtonText: { color: '#333', fontSize: 16, fontWeight: '600' },
  forgotPassword: { alignItems: 'center' },
  forgotText: { color: '#666', fontSize: 14 },
  signUpLink: { alignItems: 'center', marginTop: 24, marginBottom: 8 },
  signUpLinkBold: { color: '#E67E22', fontWeight: 'bold' }
});