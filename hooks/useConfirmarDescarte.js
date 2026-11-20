import React, { useRef, useState } from 'react';
import { useNavigation, usePreventRemove } from '@react-navigation/native';
import ConfirmModal from '../components/ConfirmModal';
import { colors } from '../theme';

// Pergunta antes de sair de um formulário com alterações não salvas.
// Devolve o modal de confirmação (para renderizar na tela) e uma função
// para sair sem perguntar (usada ao salvar ou publicar).
export default function useConfirmarDescarte(temAlteracao) {
  const navigation = useNavigation();
  const liberado = useRef(false);
  const [saidaPendente, setSaidaPendente] = useState(null);

  usePreventRemove(temAlteracao, ({ data }) => {
    if (liberado.current) {
      navigation.dispatch(data.action);
      return;
    }
    setSaidaPendente(data.action);
  });

  const descartar = () => {
    const acao = saidaPendente;
    setSaidaPendente(null);
    navigation.dispatch(acao);
  };

  const modalDescarte = (
    <ConfirmModal
      visible={Boolean(saidaPendente)}
      icone="trash-outline"
      cor={colors.danger}
      titulo="Descartar alterações?"
      texto="O que você preencheu nesta tela será perdido."
      confirmar="Descartar"
      voltar="Continuar editando"
      onConfirm={descartar}
      onClose={() => setSaidaPendente(null)}
    />
  );

  const sairSemPerguntar = (sair) => {
    liberado.current = true;
    sair();
  };

  return { sairSemPerguntar, modalDescarte };
}
