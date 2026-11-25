import React, { createContext, useContext, useMemo, useState } from 'react';
import { ANIMAIS } from '../data/animais';
import { hoje, somarDias, somarMeses } from '../utils/date';
import { useNotificacoes } from './NotificacoesContext';
import { useVisitas } from './VisitasContext';

// Apadrinhamentos vigentes iniciais (em memória)
const INICIAIS = [
  {
    id: 'apad-1',
    animalId: '1',
    valorCentavos: 5000,
    pagamento: 'pix',
    desde: '03/11/2026',
    proximaCobranca: '03/12/2026',
    pausadoAte: null,
    status: 'ativo',
    prazoEscolha: null,
  },
  {
    id: 'apad-4',
    animalId: '4',
    valorCentavos: 2000,
    pagamento: 'cartao',
    desde: '03/11/2026',
    proximaCobranca: '03/12/2026',
    pausadoAte: null,
    status: 'ativo',
    prazoEscolha: null,
  },
];

// Histórico inicial de apadrinhamentos encerrados (inclui caso Em memória para demonstração)
const ENCERRADOS_INICIAIS = [
  {
    id: 'apad-mel',
    animalId: '5',
    valorCentavos: 5000,
    pagamento: 'pix',
    desde: '10/03/2024',
    dataFim: '18/09/2025',
    encerradoEm: '18/09/2025',
    status: 'encerrado_memorial',
  },
];

const ApadrinhamentosContext = createContext(null);

export function ApadrinhamentosProvider({ children }) {
  const [animais, setAnimais] = useState(ANIMAIS);
  const [apadrinhamentos, setApadrinhamentos] = useState(INICIAIS);
  const [encerrados, setEncerrados] = useState(ENCERRADOS_INICIAIS);

  const { adicionarNotificacaoMemorial } = useNotificacoes();
  const { removerAnimalDasVisitas } = useVisitas();

  const value = useMemo(() => {
    const matchAlvo = (item, alvo) => item.id === alvo || item.animalId === alvo;

    const alterar = (alvo, mudar) =>
      setApadrinhamentos((atual) => atual.map((item) => (matchAlvo(item, alvo) ? { ...item, ...mudar(item) } : item)));

    const buscarAnimal = (id) => animais.find((animal) => animal.id === id);

    return {
      animais,
      animaisDisponiveis: animais.filter((animal) => animal.status !== 'memorial'),
      animaisMemoriais: animais.filter((animal) => animal.status === 'memorial'),
      buscarAnimal,
      atualizarFotoAnimal: (animalId, novaImagem) =>
        setAnimais((atual) =>
          atual.map((animal) => (animal.id === animalId ? { ...animal, imagem: novaImagem, capa: novaImagem } : animal))
        ),

      apadrinhamentos,
      apadrinhamentosEncerrados: encerrados,
      buscarApadrinhamento: (alvo) =>
        apadrinhamentos.find((item) => matchAlvo(item, alvo)),

      apadrinhar: (animalId, valorCentavos, pagamento) => {
        const isVigente = (item) =>
          item.animalId === animalId && item.status !== 'encerrado' && item.status !== 'cancelado';
        if (apadrinhamentos.some(isVigente)) return false;

        setApadrinhamentos((atual) =>
          atual.some(isVigente)
            ? atual
            : [
                ...atual,
                {
                  id: 'apad-' + animalId + '-' + Date.now(),
                  animalId,
                  valorCentavos,
                  pagamento,
                  desde: hoje(),
                  proximaCobranca: somarMeses(hoje(), 1),
                  pausadoAte: null,
                  status: 'ativo',
                  prazoEscolha: null,
                },
              ]
        );
        return true;
      },

      atualizar: (alvo, mudancas) => alterar(alvo, () => mudancas),
      // A pausa pula uma cobrança: ela volta um mês depois da próxima
      pausar: (alvo) => alterar(alvo, (item) => ({ status: 'pausado', pausadoAte: somarMeses(item.proximaCobranca, 1) })),
      retomar: (alvo) => alterar(alvo, () => ({ status: 'ativo', pausadoAte: null })),
      cancelar: (alvo) => {
        const alvoEncontrado = apadrinhamentos.find((item) => matchAlvo(item, alvo));
        setApadrinhamentos((atual) => atual.filter((item) => !matchAlvo(item, alvo)));
        if (alvoEncontrado) {
          setEncerrados((atual) => [
            { ...alvoEncontrado, encerradoEm: hoje(), status: 'encerrado' },
            ...atual,
          ]);
        }
      },

      // Fluxo de falecimento (Modo Memorial)
      registrarFalecimentoAnimal: (animalId, { dataFalecimento, mensagemDespedida }) => {
        const animalAlvo = animais.find((a) => a.id === animalId);
        if (!animalAlvo) return;

        const prazo = somarDias(hoje(), 30);
        const mensagemLimpa = mensagemDespedida?.trim() || null;

        setAnimais((atual) =>
          atual.map((animal) =>
            animal.id === animalId
              ? {
                  ...animal,
                  status: 'memorial',
                  dataFalecimento: dataFalecimento || hoje(),
                  mensagemDespedida: mensagemLimpa,
                }
              : animal
          )
        );

        setApadrinhamentos((atual) =>
          atual.map((item) =>
            item.animalId === animalId
              ? {
                  ...item,
                  status: 'pausado_memorial',
                  pausadoAte: prazo,
                  prazoEscolha: prazo,
                }
              : item
          )
        );

        removerAnimalDasVisitas(animalId);
        adicionarNotificacaoMemorial(animalAlvo);
      },

      transferirApadrinhamento: (apadrinhamentoId, novoAnimalId) => {
        const jaVigenteParaDestino = (lista) =>
          lista.some(
            (item) =>
              item.animalId === novoAnimalId &&
              item.status !== 'encerrado' &&
              item.status !== 'encerrado_memorial' &&
              item.status !== 'cancelado'
          );

        if (jaVigenteParaDestino(apadrinhamentos)) return false;

        const antigo = apadrinhamentos.find((item) => matchAlvo(item, apadrinhamentoId));
        if (!antigo) return false;

        const dataHoje = hoje();
        const novoVinculo = {
          id: 'apad-' + novoAnimalId + '-' + Date.now(),
          animalId: novoAnimalId,
          valorCentavos: antigo.valorCentavos,
          pagamento: antigo.pagamento,
          desde: dataHoje,
          proximaCobranca: antigo.proximaCobranca ?? somarMeses(dataHoje, 1),
          pausadoAte: null,
          status: 'ativo',
          prazoEscolha: null,
        };

        // Encerra o vínculo do animal falecido preservando o certificado "Em memória" e cria novo vínculo ativo
        setApadrinhamentos((atual) => {
          if (jaVigenteParaDestino(atual)) return atual;
          return [...atual.filter((item) => !matchAlvo(item, apadrinhamentoId)), novoVinculo];
        });

        setEncerrados((atual) => [
          { ...antigo, dataFim: dataHoje, encerradoEm: dataHoje, status: 'encerrado_memorial' },
          ...atual,
        ]);

        return true;
      },

      encerrarApadrinhamentoMemorial: (apadrinhamentoId) => {
        const item = apadrinhamentos.find((ap) => matchAlvo(ap, apadrinhamentoId));
        const dataHoje = hoje();
        setApadrinhamentos((atual) => atual.filter((ap) => !matchAlvo(ap, apadrinhamentoId)));
        if (item) {
          setEncerrados((atual) => [
            { ...item, dataFim: dataHoje, encerradoEm: dataHoje, status: 'encerrado_memorial' },
            ...atual,
          ]);
        }
      },

      adicionarLembranca: (animalId, autor, texto) => {
        const textoLimpo = texto?.trim();
        if (!textoLimpo) return;
        const novaLembranca = {
          id: 'lemb-' + Date.now(),
          autor: autor || 'Padrinho',
          texto: textoLimpo,
          data: hoje(),
        };
        setAnimais((atual) =>
          atual.map((animal) =>
            animal.id === animalId
              ? { ...animal, lembrancas: [novaLembranca, ...(animal.lembrancas ?? [])] }
              : animal
          )
        );
      },
    };
  }, [animais, apadrinhamentos, encerrados, adicionarNotificacaoMemorial, removerAnimalDasVisitas]);

  return <ApadrinhamentosContext.Provider value={value}>{children}</ApadrinhamentosContext.Provider>;
}

export const useApadrinhamentos = () => useContext(ApadrinhamentosContext);
