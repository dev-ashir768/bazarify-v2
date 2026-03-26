"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const PriceFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState([0, 5000]);

  const handleSliderChange = (newValues: number[]) => {
    setValues(newValues);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setValues([val, values[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setValues([values[0], val]);
  };

  const handleReset = () => {
    setValues([0, 5000]);
  };

  const handleDone = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full bg-white! hover:bg-white! h-12 px-8 text-sm border-gray-200"
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
        >
          Price
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-[340px] p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-gray-100" 
        align="end"
      >
        <div className="flex flex-col space-y-6">
          {/* Slider */}
          <div className="px-2 pt-4">
            <Slider
              defaultValue={[0, 5000]}
              max={10000}
              step={100}
              value={values}
              onValueChange={handleSliderChange}
              className="w-full"
            />
          </div>

          {/* Inputs */}
          <div className="flex items-center justify-between gap-3">
            <Input
              value={values[0]}
              onChange={handleMinChange}
              className="h-12 text-center text-base rounded-xl border-gray-200 bg-white"
            />
            <span className="text-gray-500 font-medium">to</span>
            <Input
              value={values[1].toLocaleString()}
              onChange={handleMaxChange}
              className="h-12 text-center text-base rounded-xl border-gray-200 bg-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              className="flex-1 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-base font-medium"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-medium"
              onClick={handleDone}
            >
              Done
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriceFilter;
