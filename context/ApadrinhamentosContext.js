import React, { createContext, useContext, useMemo, useState } from 'react';
import { hoje, somarMeses } from '../utils/date';

// Apadrinhamentos de quem está logado. Ficam em memória enquanto o app está aberto
const INICIAIS = [
  { animalId: '1', valorCentavos: 5000, pagamento: 'pix', desde: '03/11/2026', proximaCobranca: '03/12/2026', pausadoAte: null },
  { animalId: '4', valorCentavos: 2000, pagamento: 'cartao', desde: '03/11/2026', proximaCobranca: '03/12/2026', pausadoAte: null },
];

const ApadrinhamentosContext = createContext(null);

export function ApadrinhamentosProvider({ children }) {
  const [apadrinhamentos, setApadrinhamentos] = useState(INICIAIS);

  const value = useMemo(() => {
    const alterar = (animalId, mudar) =>
      setApadrinhamentos((atual) => atual.map((item) => (item.animalId === animalId ? { ...item, ...mudar(item) } : item)));

    return {
      apadrinhamentos,
      buscarApadrinhamento: (animalId) => apadrinhamentos.find((item) => item.animalId === animalId),
      apadrinhar: (animalId, valorCentavos, pagamento) =>
        setApadrinhamentos((atual) =>
          atual.some((item) => item.animalId === animalId)
            ? atual
            : [...atual, { animalId, valorCentavos, pagamento, desde: hoje(), proximaCobranca: somarMeses(hoje(), 1), pausadoAte: null }]
        ),
      atualizar: (animalId, mudancas) => alterar(animalId, () => mudancas),
      // A pausa pula uma cobrança: ela volta um mês depois da próxima
      pausar: (animalId) => alterar(animalId, (item) => ({ pausadoAte: somarMeses(item.proximaCobranca, 1) })),
      retomar: (animalId) => alterar(animalId, () => ({ pausadoAte: null })),
      cancelar: (animalId) => setApadrinhamentos((atual) => atual.filter((item) => item.animalId !== animalId)),
    };
  }, [apadrinhamentos]);

  return <ApadrinhamentosContext.Provider value={value}>{children}</ApadrinhamentosContext.Provider>;
}

export const useApadrinhamentos = () => useContext(ApadrinhamentosContext);
