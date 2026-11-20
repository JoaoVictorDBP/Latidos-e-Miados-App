import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

const TODAS_AS_BORDAS = ['top', 'right', 'bottom', 'left'];

// Contêiner padrão das telas: fundo branco respeitando as áreas seguras
export default function Screen({ children, style, edges = TODAS_AS_BORDAS }) {
  return (
    <SafeAreaView style={[styles.screen, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
});
