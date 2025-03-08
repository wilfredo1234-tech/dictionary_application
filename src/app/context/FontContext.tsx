"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const fonts = ["Serif", "sans-serif", "monospace"];

interface FontContextType {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  fonts: string[];
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState("sans-serif");

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont, fonts }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) throw new Error();
  return context;
};
