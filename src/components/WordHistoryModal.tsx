"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<{ word: string; date: string }[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, [isOpen]);

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search History</DialogTitle>
        </DialogHeader>
        <div className="max-h-60 overflow-y-auto">
          {history.length > 0 ? (
            <ul>
              {history.map((item, index) => (
                <li key={index} className="p-2 border-b">
                  <span className="font-semibold">{item.word}</span> - {item.date}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No search history found.</p>
          )}
        </div>
        {history.length > 0 && (
          <Button variant="destructive" onClick={clearHistory} className="w-full">
            Clear History
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
