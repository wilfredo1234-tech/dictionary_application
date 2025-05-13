import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WordData } from "../../../types/dictionary"; 

// Definimos la URL de la API del diccionario. Se usa una variable de entorno si está definida, de lo contrario, se usa una URL por defecto.
const API_URL = process.env.NEXT_PUBLIC_DICTIONARY_API || "https://api.dictionaryapi.dev/api/v2/entries/en";

// Acción asíncrona para buscar una palabra en la API del diccionario.
export const fetchWord = createAsyncThunk(
  "dictionary/fetchWord", 
  async (word: string) => {

    const response = await fetch(`${API_URL}/${word}`);
    

    if (!response.ok) {
      throw new Error("No se encontró la palabra");
    }
    
    // Convertimos la respuesta en JSON y la almacenamos en data
    const data: WordData[] = await response.json();
    
    // Retornamos el primer resultado de la API
    return data[0];
  }
);

// Definimos el estado inicial del diccionario
interface DictionaryState {
  wordData: WordData | null; // Almacena la información de la palabra buscada
  loading: boolean; // Indica si la solicitud está en progreso
  error: string | null; // Almacena mensajes de error si la búsqueda falla
}

// Estado inicial de Redux para este slice
const initialState: DictionaryState = {
  wordData: null, // No hay datos inicialmente
  loading: false, // No está cargando por defecto
  error: null, // No hay errores por defecto
};

// Creamos un slice de Redux para gestionar el estado del diccionario
const dictionarySlice = createSlice({
  name: "dictionary", // Nombre del slice
  initialState, // Estado inicial
  reducers: {}, // No hay reducers síncronos porque todo se maneja con `extraReducers`
  extraReducers: (builder) => {
    builder
      // Caso cuando la acción fetchWord está en estado "pending" (cargando)
      .addCase(fetchWord.pending, (state) => {
        state.loading = true; // Indicamos que está cargando
        state.error = null; // Reseteamos cualquier error anterior
      })
      // Caso cuando la acción fetchWord se completa con éxito
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.loading = false; // Detenemos la carga
        state.wordData = action.payload; // Guardamos los datos de la palabra
      })
      // Caso cuando la acción fetchWord falla
      .addCase(fetchWord.rejected, (state, action) => {
        state.loading = false; // Detenemos la carga
        state.error = action.error.message ?? "Error desconocido"; // Guardamos el mensaje de error
      });
  },
});


export default dictionarySlice.reducer;
