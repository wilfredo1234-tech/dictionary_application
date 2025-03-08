"use client";

import SearchBar from "./SearchBar";
import WordHeader from "./WordHeader";
import MeaningList from "./MeaningList";
import ExtraInfo from "./ExtraInfo";
import { useFont } from "@/app/context/FontContext";


export default function DictionarySearch() {
  const { selectedFont } = useFont(); // Obtenemos la fuente seleccionada

  return (
    <div
      className="w-full flex flex-col items-center px-4 absolute top-[70px] left-0 right-0"
      style={{ fontFamily: selectedFont }} //Aplicamos la fuente seleccionada
    >
      {/* SearchBar alineado justo debajo del Navbar */}
      <div className="w-full max-w-2xl">
        <SearchBar />
      </div>

      {/* Contenido del diccionario */}
      <div className="max-w-xl w-full mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <WordHeader />
        <MeaningList />
        <ExtraInfo />
      </div>
    </div>
  );
}
