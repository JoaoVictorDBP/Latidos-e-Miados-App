import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Button from './Button';
import { colors } from '../theme';

export default function GoogleButton({ onPress, style }) {
  return (
    <Button
      title="Prosseguir com Google"
      variant="neutral"
      onPress={onPress}
      icon={<Image source={require('../assets/images/google.png')} style={styles.icon} />}
      style={style}
      textStyle={styles.text}
    />
  );
}

const styles = StyleSheet.create({
  icon: { width: 20, height: 20, marginRight: 10 },
  text: { color: colors.text, fontWeight: '600' },
});
