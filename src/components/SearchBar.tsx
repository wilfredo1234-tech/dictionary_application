"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { fetchWord } from "@/app/store/dictionarySlice";
import { AppDispatch } from "@/app/store/store";
import { Search } from "lucide-react";

//  Definir validaciones con Zod
const searchSchema = z.object({
  word: z
    .string()
    .min(2, "The search term must have at least 2 characters.")
    .max(50, "The search term cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s-]+$/, "Only letters, spaces, and hyphens are allowed."),
});

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ word: string }>({
    resolver: zodResolver(searchSchema),
  });

  const saveSearchHistory = (word: string) => {
    const currentDate = new Date().toLocaleString();
    const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updatedHistory = [{ word, date: currentDate }, ...existingHistory]; // Agrega la nueva búsqueda al inicio
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory.slice(0, 10))); // Limita a 10 búsquedas
  };

  const onSubmit = (data: { word: string }) => {
    dispatch(fetchWord(data.word));
    saveSearchHistory(data.word);
    reset(); //  Limpia el input después de buscar
  };

  return (
    <div className="w-full flex flex-col items-center mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md w-full max-w-2xl"
      >
        {/* Input de búsqueda */}
        <input
          type="text"
          {...register("word")}
          className="bg-transparent outline-none w-full text-gray-700 dark:text-white placeholder-gray-500"
          placeholder="Search for a word..."
        />
        <button type="submit" className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
          <Search className="w-5 h-5" />
        </button>
      </form>

      {/*  Muestra errores si existen */}
      {errors.word && <p className="text-red-500 text-sm mt-2">{errors.word.message}</p>}
    </div>
  );
}
