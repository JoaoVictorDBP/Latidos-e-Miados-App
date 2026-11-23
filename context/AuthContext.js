import React, { createContext, useContext, useMemo, useState } from 'react';
import { USUARIO } from '../data/usuario';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Se entrou por "Conhecer os animais", isGuest = true e usuario = null
  const [usuario, setUsuario] = useState(USUARIO);
  const [isGuest, setIsGuest] = useState(false);

  const value = useMemo(() => ({
    usuario,
    isGuest,
    entrarComoVisitante: () => {
      setIsGuest(true);
      setUsuario(null);
    },
    login: (dados = USUARIO) => {
      setIsGuest(false);
      setUsuario(dados);
    },
    logout: () => {
      setIsGuest(false);
      setUsuario(null);
    },
  }), [usuario, isGuest]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
