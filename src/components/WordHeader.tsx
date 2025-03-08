"use client";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { Play } from "lucide-react"; 
import { useEffect, useState } from "react";

export default function WordHeader() {
  const { wordData, loading, error } = useSelector((state: RootState) => state.dictionary);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (wordData?.phonetics) {
      const audioUrl = wordData.phonetics.find(p => p.audio)?.audio; 
      if (audioUrl) {
        setAudio(new Audio(audioUrl));
      }
    }
  }, [wordData?.phonetics]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!wordData) return null;

  return (
    <div className="mt-4 flex items-center justify-between border-b pb-2">
      <div>
        <h1 className="text-3xl font-bold">{wordData.word}</h1>
        <p className="text-purple-500 text-lg">{wordData.phonetic}</p>
      </div>
      {audio && (
        <button
          onClick={playAudio}
          className="p-4 bg-purple-200 rounded-full hover:bg-purple-300 transition flex items-center justify-center w-14 h-14 shadow-md"
        >
          <Play size={28} className="text-purple-600" />
        </button>
      )}
    </div>
  );
}
