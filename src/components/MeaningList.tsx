"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function MeaningList() {
  const { wordData, loading } = useSelector((state: RootState) => state.dictionary);

  if (loading) return <p className="text-gray-500">Loading definitions...</p>;

  if (!wordData) return null;

  return (
    <div className="mt-4">
      {wordData.meanings.map((meaning, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold">{meaning.partOfSpeech}</h2>
          <ul className="list-disc pl-5">
            {meaning.definitions.map((def, idx) => (
              <li key={idx}>{def.definition}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
