import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation, route }) {
  const [email, setEmail] = useState(route.params?.email ?? '');
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const erroEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Informe um e-mail válido' : '';

  // Simula o envio do e-mail de recuperação no protótipo
  const handleEnviar = () => {
    setTentouEnviar(true);
    if (erroEmail) return;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.sentContent}>
          <View style={styles.sentIcon}>
            <Ionicons name="mail-outline" size={36} color="#E67E22" />
          </View>
          <Text style={styles.sentTitle}>Verifique seu e-mail</Text>
          <Text style={styles.sentText}>
            Enviamos um link para redefinir sua senha para <Text style={styles.bold}>{email.trim()}</Text>. Confira também a caixa de spam.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Voltar para o login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setEnviado(false)}>
          <Text style={styles.secondaryButtonText}>Usar outro e-mail</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" style={styles.backText} />
      </TouchableOpacity>

      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Recuperar senha</Text>
          <Text style={styles.subtitle}>Informe seu e-mail e enviaremos um link para você criar uma nova senha</Text>

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

          <TouchableOpacity style={styles.primaryButton} onPress={handleEnviar}>
            <Text style={styles.primaryButtonText}>Enviar link</Text>
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
  primaryButton: { backgroundColor: '#E67E22', paddingVertical: 16, borderRadius: 30, alignItems: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { paddingVertical: 16, alignItems: 'center' },
  secondaryButtonText: { color: '#666', fontSize: 16, fontWeight: '600' },
  sentContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sentIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF5EB', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  sentTitle: { fontSize: 24, fontWeight: 'bold', color: '#006B5F', marginBottom: 12 },
  sentText: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 24 },
  bold: { fontWeight: 'bold', color: '#333' }
});
