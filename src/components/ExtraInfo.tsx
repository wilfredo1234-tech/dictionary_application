"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function ExtraInfo() {
  const { wordData } = useSelector((state: RootState) => state.dictionary);

  if (!wordData) return null;

  return (
    <div className="mt-4">
      {wordData.sourceUrls && (
        <p>
          <strong>Source: </strong>
          <a href={wordData.sourceUrls[0]} target="_blank" className="text-blue-500">
            {wordData.sourceUrls[0]}
          </a>
        </p>
      )}
    </div>
  );
}
