"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Sun, Moon, Book } from "lucide-react";
import MenuList from "../menulist";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

 
    const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "light";

    return (
        <nav className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
          
            <div className="flex items-center justify-between w-full">
                
                <Book
                    className="w-6 h-6 min-w-[24px] text-gray-800 dark:text-white cursor-pointer flex-shrink-0"
                    onClick={() => router.push("/")}
                />

                {/* Contenedor para menú y configuración */}
                <div className="flex items-center gap-6">
                    {/* Menú de navegación */}
                    <MenuList />

                    {/* Toggle Modo Oscuro */}
                    <div
                        className={`w-12 h-6 flex items-center rounded-full px-1 cursor-pointer transition-all relative
                        ${currentTheme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
                        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                    >
                        {/* Bolita Deslizante */}
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform
                            ${currentTheme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                        />
                    </div>

                    {/* Icono de Modo Oscuro/Claro */}
                    {currentTheme === "dark" ? (
                        <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <Moon className="w-5 h-5 text-gray-800" />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
