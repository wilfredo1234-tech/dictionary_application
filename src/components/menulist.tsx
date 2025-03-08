"use client";

import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useFont } from "@/app/context/FontContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import HistoryModal from "./WordHistoryModal";

const fonts = ["Serif", "sans-serif", "monospace"];

const MenuList: React.FC = () => {
  const { selectedFont, setSelectedFont } = useFont();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <TooltipProvider>
      <NavigationMenu>
        <NavigationMenuList>
          {/* Historial de palabras buscadas con tooltip */}
          <NavigationMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavigationMenuTrigger onClick={() => setIsModalOpen(true)}>
                  word history
                </NavigationMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Click to view your search history</p>
              </TooltipContent>
            </Tooltip>
          </NavigationMenuItem>

          {/* Selector de fuente */}
          <NavigationMenuItem>
            <NavigationMenuTrigger style={{ fontFamily: selectedFont }}>
              {selectedFont}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] p-4">
                {fonts.map((font) => (
                  <li
                    key={font}
                    className={`cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                      selectedFont === font ? "bg-gray-300 dark:bg-gray-600" : ""
                    }`}
                    onClick={() => setSelectedFont(font)}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Modal de historial */}
      <HistoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </TooltipProvider>
  );
};

export default MenuList;
