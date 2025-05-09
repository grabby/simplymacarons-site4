import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Color options for macaron shells and fillings
const shellColors = [
  { name: "Pink", value: "#FFC0CB" },
  { name: "Lavender", value: "#E6E6FA" },
  { name: "Mint", value: "#98FB98" },
  { name: "Vanilla", value: "#FFF8DC" },
  { name: "Chocolate", value: "#8B4513" },
  { name: "Lemon", value: "#FFFACD" },
  { name: "Berry", value: "#C71585" },
  { name: "Pistachio", value: "#93C572" },
  { name: "Coffee", value: "#6F4E37" },
  { name: "Orange", value: "#FFA500" },
  { name: "Blue", value: "#ADD8E6" },
  { name: "Red", value: "#FF6B6B" },
];

const fillingColors = [
  { name: "Vanilla Cream", value: "#FFFDD0" },
  { name: "Chocolate Ganache", value: "#3C2218" },
  { name: "Raspberry", value: "#E30B5C" },
  { name: "Lemon Curd", value: "#FFF44F" },
  { name: "Mint Buttercream", value: "#98FB98" },
  { name: "Pistachio", value: "#93C572" },
  { name: "Caramel", value: "#C19A6B" },
  { name: "Coffee", value: "#6F4E37" },
  { name: "Rose", value: "#FF66CC" },
  { name: "Blueberry", value: "#4682B4" },
  { name: "Orange", value: "#FFA500" },
  { name: "Matcha", value: "#D0F0C0" },
];

interface MacaronColorPickerProps {
  onShellColorSelect: (color: { name: string, value: string }) => void;
  onFillingColorSelect: (color: { name: string, value: string }) => void;
  selectedShellColor: { name: string, value: string };
  selectedFillingColor: { name: string, value: string };
}

const MacaronColorPicker: React.FC<MacaronColorPickerProps> = ({
  onShellColorSelect,
  onFillingColorSelect,
  selectedShellColor,
  selectedFillingColor,
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Shell Color</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between border-2"
              style={{ borderColor: selectedShellColor.value }}
            >
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: selectedShellColor.value }}
                />
                <span>{selectedShellColor.name}</span>
              </div>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6L7.5 9L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="grid grid-cols-3 gap-2">
              {shellColors.map((color) => (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onShellColorSelect(color)}
                  className={`h-12 rounded-md flex flex-col items-center justify-center p-1 border ${
                    selectedShellColor.name === color.name ? 'border-2 border-black' : 'border-gray-200'
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded-full mb-1" 
                    style={{ backgroundColor: color.value }} 
                  />
                  <span className="text-xs text-center truncate w-full">{color.name}</span>
                </motion.button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Filling Color</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between border-2"
              style={{ borderColor: selectedFillingColor.value }}
            >
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: selectedFillingColor.value }}
                />
                <span>{selectedFillingColor.name}</span>
              </div>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 6L7.5 9L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="grid grid-cols-3 gap-2">
              {fillingColors.map((color) => (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFillingColorSelect(color)}
                  className={`h-12 rounded-md flex flex-col items-center justify-center p-1 border ${
                    selectedFillingColor.name === color.name ? 'border-2 border-black' : 'border-gray-200'
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded-full mb-1" 
                    style={{ backgroundColor: color.value }} 
                  />
                  <span className="text-xs text-center truncate w-full">{color.name}</span>
                </motion.button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MacaronColorPicker;