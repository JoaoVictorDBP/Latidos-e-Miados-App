import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import GoogleButton from '../components/GoogleButton';
import TextField from '../components/TextField';
import { useAuth } from '../context/AuthContext';
import { emailValido } from '../utils/text';
import { authStyles } from '../styles/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tentouEntrar, setTentouEntrar] = useState(false);
  const { login } = useAuth();

  const erroEmail = tentouEntrar && !emailValido(email) ? 'Informe um e-mail válido' : '';
  const erroSenha = tentouEntrar && !senha ? 'Informe sua senha' : '';

  const irParaApp = () => {
    login({ nome: 'Daniel', email: email || 'daniel@email.com' });
    navigation.navigate('MainTabs');
  };

  // Simula o login no protótipo, exigindo os campos preenchidos como no cadastro
  const entrar = () => {
    setTentouEntrar(true);
    if (emailValido(email) && senha) irParaApp();
  };

  return (
    <Screen style={authStyles.container}>
      <BackButton style={authStyles.backButton} />

      <Text style={authStyles.title}>Bem-vindo de volta!</Text>
      <Text style={authStyles.subtitle}>Entre na sua conta com e-mail e senha</Text>

      <ScrollView style={authStyles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TextField label="E-mail" value={email} onChangeText={setEmail} error={erroEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <TextField label="Senha" value={senha} onChangeText={setSenha} error={erroSenha} password autoCapitalize="none" autoComplete="current-password" />

        <Button title="Entrar" onPress={entrar} style={authStyles.spaced} />
        <Text style={authStyles.orText}>ou</Text>
        <GoogleButton onPress={irParaApp} style={authStyles.spaced} />

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('ForgotPassword', { email })}>
          <Text style={authStyles.linkText}>Esqueci a senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.link, styles.signUpLink]} onPress={() => navigation.navigate('SignUp')}>
          <Text style={authStyles.linkText}>Não tem uma conta? <Text style={authStyles.linkTextBold}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  link: { alignItems: 'center' },
  signUpLink: { marginTop: 24, marginBottom: 8 },
});
