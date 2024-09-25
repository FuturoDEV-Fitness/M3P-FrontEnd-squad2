import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const ExerciciosContext = createContext();

export const ExerciciosContextProvider = ({ children }) => {
 const API_URL = "http://localhost:3000/exercicios";
 const { data, loading, isVisible } = useFetch(API_URL);
 const usuarioId = JSON.parse(localStorage.getItem("userId"));
 
 const locaisUsuario = data?.filter((exercicio) => exercicio.id_usuario === usuarioId) || [];
 const positionMarker = data?.map(({ latitude, longitude }) => ({ latitude, longitude })) || [];

 return (
  <ExerciciosContext.Provider
   value={{
    exercicios: data || [],
    isVisible,
    loading,
    locaisUsuario,
    positionMarker
   }}>
   {children}
  </ExerciciosContext.Provider>
 );
};
