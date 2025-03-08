import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WordData } from "../../../types/dictionary";

const API_URL = process.env.NEXT_PUBLIC_DICTIONARY_API || "https://api.dictionaryapi.dev/api/v2/entries/en";

export const fetchWord = createAsyncThunk("dictionary/fetchWord", async (word: string) => {
  const response = await fetch(`${API_URL}/${word}`);
  if (!response.ok) {
    throw new Error("No se encontró la palabra");
  }
  const data: WordData[] = await response.json();
  return data[0];
});

interface DictionaryState {
  wordData: WordData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DictionaryState = {
  wordData: null,
  loading: false,
  error: null,
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.loading = false;
        state.wordData = action.payload;
      })
      .addCase(fetchWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error desconocido";
      });
  },
});

export default dictionarySlice.reducer;
