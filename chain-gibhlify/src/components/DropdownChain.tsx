"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { chainArray } from "@/utils/chains";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-1 text-black bg-white rounded-lg z-100 focus:outline-none"
      >
        Filter By Chain <FaChevronDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 container mz-auto w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
          <ul className="py-2 text-gray-800">
            {chainArray.map((chain) => (
              <li key={chain.id} className="px-4 py-1 hover:bg-gray-200">
                {chain.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
