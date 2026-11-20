import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { ZoomIn } from 'react-native-reanimated';
import Screen from '../components/Screen';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { emailValido } from '../utils/text';
import { colors, typography } from '../theme';
import { authStyles } from '../styles/auth';

export default function ForgotPasswordScreen({ navigation, route }) {
  const [email, setEmail] = useState(route.params?.email ?? '');
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const erroEmail = emailValido(email) ? '' : 'Informe um e-mail válido';

  // Simula o envio do e-mail de recuperação no protótipo
  const handleEnviar = () => {
    setTentouEnviar(true);
    if (!erroEmail) setEnviado(true);
  };

  if (enviado) {
    return (
      <Screen style={authStyles.container}>
        <View style={styles.sentContent}>
          <Animated.View style={styles.sentIcon} entering={ZoomIn.duration(300)}>
            <Ionicons name="mail-outline" size={36} color={colors.primary} />
          </Animated.View>
          <Text style={styles.sentTitle}>Verifique seu e-mail</Text>
          <Text style={styles.sentText}>
            Enviamos um link para redefinir sua senha para <Text style={typography.bold}>{email.trim()}</Text>. Confira também a caixa de spam.
          </Text>
        </View>

        <Button title="Voltar para o login" onPress={() => navigation.goBack()} style={styles.spacedButton} />
        <Button title="Usar outro e-mail" variant="ghost" onPress={() => setEnviado(false)} />
      </Screen>
    );
  }

  return (
    <Screen style={authStyles.container}>
      <BackButton style={authStyles.backButton} />

      <KeyboardAvoidingView style={authStyles.form} behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={authStyles.title}>Recuperar senha</Text>
          <Text style={authStyles.subtitle}>Informe seu e-mail e enviaremos um link para você criar uma nova senha</Text>

          <TextField
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            error={tentouEnviar ? erroEmail : ''}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Button title="Enviar link" onPress={handleEnviar} style={styles.spacedButton} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  spacedButton: { marginBottom: 12 },
  sentContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sentIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  sentTitle: { ...typography.pageTitle, marginBottom: 12 },
  sentText: { ...typography.subtitle, textAlign: 'center', lineHeight: 24 },
});
