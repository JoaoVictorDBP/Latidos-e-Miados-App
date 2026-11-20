import React, { createContext, useContext, useMemo, useState } from 'react';
import { USUARIO } from '../data/usuario';

// Curtidas e comentários feitos durante o uso do protótipo
const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [curtidos, setCurtidos] = useState({});
  const [novosComentarios, setNovosComentarios] = useState({});

  const value = useMemo(() => ({
    estaCurtido: (post) => Boolean(curtidos[post.id]),
    totalCurtidas: (post) => post.curtidas + (curtidos[post.id] ? 1 : 0),
    alternarCurtida: (post) => setCurtidos((atual) => ({ ...atual, [post.id]: !atual[post.id] })),
    comentariosDe: (post) => [...post.comentarios, ...(novosComentarios[post.id] ?? [])],
    comentar: (post, texto) =>
      setNovosComentarios((atual) => {
        const doPost = atual[post.id] ?? [];
        const comentario = { id: 'novo-' + doPost.length, autor: USUARIO.nome, texto };
        return { ...atual, [post.id]: [...doPost, comentario] };
      }),
  }), [curtidos, novosComentarios]);

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export const usePosts = () => useContext(PostsContext);
