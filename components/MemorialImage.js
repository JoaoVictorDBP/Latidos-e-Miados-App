import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Renderiza fotos de animais em modo memorial em preto e branco (P&B) com camada sutil de dessaturação como fallback
export default function MemorialImage({ source, style, imageStyle, children }) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={[styles.image, styles.grayscale, imageStyle]}
      />
      <View style={styles.desaturateFallback} pointerEvents="none" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: '100%' },
  grayscale: { filter: [{ grayscale: 1 }], opacity: 0.88 },
  desaturateFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(110, 110, 110, 0.22)',
  },
});
