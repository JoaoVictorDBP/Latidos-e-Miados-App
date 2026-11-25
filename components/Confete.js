import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CannonConfetti } from 'react-native-fast-confetti';

const ORIGENS = ['bottom-left', 'bottom-right'];

// Confete que sai dos dois cantos de baixo, cobre a tela sem bloquear toques
// e some sozinho ao terminar. O estado fica aqui dentro para que o fim da
// animação não renderize de novo a tela que o usa.
export default function Confete({ cores }) {
  const [visivel, setVisivel] = useState(true);
  if (!visivel) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <CannonConfetti autoplay autoStartDelay={300} gravity={3} colors={cores} fadeOutOnEnd onAnimationEnd={() => setVisivel(false)}>
        {ORIGENS.map((posicao) => (
          <CannonConfetti.Origin key={posicao} position={posicao} count={100} initialSpeed={3}>
            <CannonConfetti.Flake size={12} radius={6} />
            <CannonConfetti.Flake width={8} height={14} />
          </CannonConfetti.Origin>
        ))}
      </CannonConfetti>
    </View>
  );
}
