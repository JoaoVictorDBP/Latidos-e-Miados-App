import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const erroNome = !nome.trim() ? 'Informe seu nome' : '';
  const erroEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Informe um e-mail válido' : '';
  const erroSenha = senha.length < 6 ? 'A senha precisa ter pelo menos 6 caracteres' : '';
  const erroConfirmar = !confirmarSenha ? 'Confirme sua senha' : confirmarSenha !== senha ? 'As senhas não são iguais' : '';

  // Simula a criação da conta no protótipo
  const handleCadastrar = () => {
    setTentouEnviar(true);
    if (erroNome || erroEmail || erroSenha || erroConfirmar) return;
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
      </TouchableOpacity>

      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Cadastre-se para apadrinhar e acompanhar os animais</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={[styles.input, tentouEnviar && erroNome ? styles.inputError : null]}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            autoComplete="name"
          />
          {tentouEnviar && erroNome ? <Text style={styles.errorText}>{erroNome}</Text> : null}

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, tentouEnviar && erroEmail ? styles.inputError : null]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {tentouEnviar && erroEmail ? <Text style={styles.errorText}>{erroEmail}</Text> : null}

          <Text style={styles.label}>Senha</Text>
          <View>
            <TextInput
              style={[styles.input, styles.passwordInput, tentouEnviar && erroSenha ? styles.inputError : null]}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
              autoCapitalize="none"
              autoComplete="new-password"
              placeholder="Mínimo de 6 caracteres"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setSenhaVisivel(!senhaVisivel)} accessibilityLabel={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}>
              <Ionicons name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'} size={20} color="#666" />
            </TouchableOpacity>
          </View>
          {tentouEnviar && erroSenha ? <Text style={styles.errorText}>{erroSenha}</Text> : null}

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={[styles.input, tentouEnviar && erroConfirmar ? styles.inputError : null]}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!senhaVisivel}
            autoCapitalize="none"
            autoComplete="new-password"
          />
          {tentouEnviar && erroConfirmar ? <Text style={styles.errorText}>{erroConfirmar}</Text> : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleCadastrar}>
            <Text style={styles.primaryButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>ou</Text>

          <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('MainTabs')}>
            <Image source={require('../assets/images/google.png')} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Prosseguir com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.goBack()}>
            <Text style={styles.loginText}>Já tem uma conta? <Text style={styles.loginTextBold}>Entrar</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  inputError: { borderBottomColor: '#FF4D4D', marginBottom: 4 },
  errorText: { color: '#FF4D4D', fontSize: 12, marginBottom: 20 },
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 24 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orText: { textAlign: 'center', color: '#666', marginBottom: 24 },
  googleButton: { borderWidth: 1, borderColor: '#ccc', paddingVertical: 16, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  googleIcon: { width: 20, height: 20, marginRight: 10 },
  passwordInput: { paddingRight: 32 },
  eyeButton: { position: 'absolute', right: 0, top: 6, padding: 4 },
  googleButtonText: { color: '#333', fontSize: 16, fontWeight: '600' },
  loginLink: { alignItems: 'center', marginBottom: 8 },
  loginText: { color: '#666', fontSize: 14 },
  loginTextBold: { color: '#E67E22', fontWeight: 'bold' }
});
