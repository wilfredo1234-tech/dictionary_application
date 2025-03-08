"use client"; 

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { FontProvider } from "../context/FontContext";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <FontProvider>
          {children}
        </FontProvider>
      </ThemeProvider>
    </Provider>
  );
}
