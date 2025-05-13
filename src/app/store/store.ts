// Importamos `configureStore` de Redux Toolkit para configurar el store fácilmente.
import { configureStore } from "@reduxjs/toolkit";

// Importamos el reducer del diccionario, que manejará el estado relacionado con la búsqueda de palabras.
import dictionaryReducer from "./dictionarySlice"; 

// Configuramos el store de Redux
export const store = configureStore({
  reducer: {
    // Agregamos `dictionaryReducer` bajo la clave `dictionary`, lo que significa que 
    // el estado relacionado con las palabras estará disponible en `state.dictionary`
    dictionary: dictionaryReducer,
  },
});

// Definimos `RootState`, que representa la estructura completa del estado global de Redux.
// Esto nos permite obtener sugerencias y validaciones de TypeScript en toda la aplicación.
export type RootState = ReturnType<typeof store.getState>;

// Definimos `AppDispatch`, que representa la función `dispatch` de Redux.
// Nos ayuda a tipar correctamente las acciones que enviamos a Redux.
export type AppDispatch = typeof store.dispatch;
