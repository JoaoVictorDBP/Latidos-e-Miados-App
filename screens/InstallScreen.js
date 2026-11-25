import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Button from '../components/Button';
import {
  dispensarInstalacao,
  instalarApp,
  ouvirMudancasDeInstalacao,
  podeInstalarDireto,
  tipoDeNavegador,
} from '../utils/instalacaoPwa';
import { colors, typography } from '../theme';

const PASSOS = {
  iphone: [
    { icone: 'share-outline', texto: 'Toque em Compartilhar, na barra do Safari' },
    { icone: 'add-circle-outline', texto: 'Escolha "Adicionar à Tela de Início"' },
    { icone: 'phone-portrait-outline', texto: 'Toque em "Adicionar" e abra pelo ícone' },
  ],
  android: [
    { icone: 'ellipsis-vertical', texto: 'Toque no menu ⋮ do Chrome, no canto de cima' },
    { icone: 'add-circle-outline', texto: 'Escolha "Instalar app" ou "Adicionar à tela inicial"' },
    { icone: 'phone-portrait-outline', texto: 'Abra o app pelo ícone na tela inicial' },
  ],
};

// Tela mostrada só na versão web, antes do app, convidando a instalar o PWA.
// Quem abre pelo ícone instalado não vê esta tela.
export default function InstallScreen({ onContinuar }) {
  const navegador = tipoDeNavegador();
  const [instalavel, setInstalavel] = useState(podeInstalarDireto());
  const [instalado, setInstalado] = useState(false);
  const [mostrarPassos, setMostrarPassos] = useState(false);

  useEffect(() => ouvirMudancasDeInstalacao(() => setInstalavel(podeInstalarDireto())), []);

  // No Android o botão aparece sempre. Se o Chrome ainda não liberou a
  // instalação direta (ele pode demorar alguns segundos), mostra o passo a passo.
  const instalar = async () => {
    if (!podeInstalarDireto()) {
      setMostrarPassos(true);
      return;
    }
    if (await instalarApp()) setInstalado(true);
  };

  const continuar = () => {
    dispensarInstalacao();
    onContinuar();
  };

  const renderizarInstrucoes = () => {
    if (instalado) {
      return (
        <View style={[styles.aviso, styles.avisoSucesso]}>
          <Ionicons name="checkmark-circle" size={28} color={colors.secondary} />
          <Text style={styles.avisoTexto}>Pronto! O app está na sua tela inicial. Feche o navegador e abra pelo ícone do Latidos & Miados.</Text>
        </View>
      );
    }
    const botaoInstalar = <Button title="Instalar app" onPress={instalar} icon={<Ionicons name="download-outline" size={20} color={colors.white} style={styles.botaoIcone} />} />;
    if (instalavel || (navegador === 'android' && !mostrarPassos)) return botaoInstalar;
    if (navegador === 'internoDeApp') {
      return (
        <View style={styles.aviso}>
          <Ionicons name="open-outline" size={24} color={colors.primary} />
          <Text style={styles.avisoTexto}>
            Você abriu o link dentro de outro app. Toque no menu (⋮ ou •••) e escolha <Text style={styles.negrito}>Abrir no navegador</Text> para poder instalar.
          </Text>
        </View>
      );
    }
    if (navegador === 'computador') {
      return (
        <View style={styles.aviso}>
          <Ionicons name="phone-portrait-outline" size={24} color={colors.primary} />
          <Text style={styles.avisoTexto}>O app foi feito para celular. Para a melhor experiência, abra este mesmo link no seu celular.</Text>
        </View>
      );
    }
    return (
      <View style={styles.passos}>
        {PASSOS[navegador].map((passo, indice) => (
          <View key={passo.texto} style={styles.passo}>
            <View style={styles.passoNumero}>
              <Text style={styles.passoNumeroTexto}>{indice + 1}</Text>
            </View>
            <Ionicons name={passo.icone} size={22} color={colors.primary} />
            <Text style={styles.passoTexto}>{passo.texto}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={require('../assets/icon.png')} style={styles.icone} accessibilityLabel="Ícone do app Latidos & Miados" />
        <Text style={styles.title}>{navegador === 'computador' ? 'Bem-vindo ao Latidos & Miados' : 'Instale o Latidos & Miados'}</Text>
        <Text style={styles.subtitle}>
          {navegador === 'computador'
            ? 'Acompanhe os animais resgatados que você apadrinha.'
            : 'Assim ele abre em tela cheia, direto da tela inicial, como um app de verdade. Leva só alguns segundos.'}
        </Text>

        <View style={styles.instrucoes}>{renderizarInstrucoes()}</View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={navegador === 'computador' ? 'Continuar' : 'Continuar no navegador'}
          variant={navegador === 'computador' ? 'primary' : 'ghost'}
          onPress={continuar}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  icone: { width: 112, height: 112, borderRadius: 26, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  title: { ...typography.pageTitle, textAlign: 'center', marginBottom: 8 },
  subtitle: { ...typography.subtitle, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  instrucoes: { width: '100%' },
  botaoIcone: { marginRight: 8 },
  passos: { gap: 12 },
  passo: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14 },
  passoNumero: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  passoNumeroTexto: { color: colors.white, fontWeight: 'bold', fontSize: 14 },
  passoTexto: { ...typography.body, flex: 1, lineHeight: 20 },
  aviso: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.primaryLight, borderRadius: 12, padding: 16 },
  avisoSucesso: { backgroundColor: colors.secondaryLight },
  avisoTexto: { ...typography.body, flex: 1, lineHeight: 20 },
  negrito: { fontWeight: 'bold' },
  footer: { padding: 24, paddingTop: 8 },
});
