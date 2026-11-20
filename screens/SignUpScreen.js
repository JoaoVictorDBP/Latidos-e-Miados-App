import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import GoogleButton from '../components/GoogleButton';
import TextField from '../components/TextField';
import { emailValido } from '../utils/text';
import { authStyles } from '../styles/auth';

const validar = ({ nome, email, senha, confirmarSenha }) => ({
  nome: !nome.trim() ? 'Informe seu nome' : '',
  email: !emailValido(email) ? 'Informe um e-mail válido' : '',
  senha: senha.length < 6 ? 'A senha precisa ter pelo menos 6 caracteres' : '',
  confirmarSenha: !confirmarSenha ? 'Confirme sua senha' : confirmarSenha !== senha ? 'As senhas não são iguais' : '',
});

export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '' });
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const erros = validar(form);
  const erroVisivel = (campo) => (tentouEnviar ? erros[campo] : '');
  const alterar = (campo) => (valor) => setForm((atual) => ({ ...atual, [campo]: valor }));

  // Simula a criação da conta no protótipo
  const handleCadastrar = () => {
    setTentouEnviar(true);
    if (Object.values(erros).some(Boolean)) return;
    navigation.navigate('MainTabs');
  };

  return (
    <Screen style={authStyles.container}>
      <BackButton style={authStyles.backButton} />

      <KeyboardAvoidingView style={authStyles.form} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={authStyles.title}>Crie sua conta</Text>
          <Text style={authStyles.subtitle}>Cadastre-se para apadrinhar e acompanhar os animais</Text>

          <TextField label="Nome" value={form.nome} onChangeText={alterar('nome')} error={erroVisivel('nome')} autoCapitalize="words" autoComplete="name" />
          <TextField label="E-mail" value={form.email} onChangeText={alterar('email')} error={erroVisivel('email')} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
          <TextField label="Senha" value={form.senha} onChangeText={alterar('senha')} error={erroVisivel('senha')} password autoCapitalize="none" autoComplete="new-password" placeholder="Mínimo de 6 caracteres" />
          <TextField label="Confirmar senha" value={form.confirmarSenha} onChangeText={alterar('confirmarSenha')} error={erroVisivel('confirmarSenha')} password autoCapitalize="none" autoComplete="new-password" />

          <Button title="Criar conta" onPress={handleCadastrar} style={authStyles.spaced} />
          <Text style={authStyles.orText}>ou</Text>
          <GoogleButton onPress={() => navigation.navigate('MainTabs')} style={authStyles.spaced} />

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.goBack()}>
            <Text style={authStyles.linkText}>Já tem uma conta? <Text style={authStyles.linkTextBold}>Entrar</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loginLink: { alignItems: 'center', marginBottom: 8 },
});
