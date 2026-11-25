import React, { createContext, useContext, useMemo, useState } from 'react';
import { ONG } from '../data/usuario';

const VISITAS_INICIAIS = [
  {
    id: 'visita-1',
    animalIds: ['1'],
    dia: 'Sáb, 29/11',
    hora: '10h30',
    endereco: ONG.endereco,
    status: 'Confirmada',
    solicitadaEm: '02/11/2026',
  },
];

const VisitasContext = createContext(null);

export function VisitasProvider({ children }) {
  const [visitas, setVisitas] = useState(VISITAS_INICIAIS);

  const value = useMemo(() => ({
    visitas,
    solicitarVisita: ({ animalIds, dia, hora }) => {
      const novaVisita = {
        id: 'visita-' + Date.now(),
        animalIds,
        dia,
        hora,
        endereco: ONG.endereco,
        status: 'Pendente',
        solicitadaEm: new Date().toLocaleDateString('pt-BR'),
      };
      setVisitas((atuais) => [novaVisita, ...atuais]);
      return novaVisita;
    },
    cancelarVisita: (id) => {
      setVisitas((atuais) => atuais.filter((v) => v.id !== id));
    },
  }), [visitas]);

  return <VisitasContext.Provider value={value}>{children}</VisitasContext.Provider>;
}

export const useVisitas = () => useContext(VisitasContext);
