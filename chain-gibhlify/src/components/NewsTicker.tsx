"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const newsHeadlines = [
  "Etheruem : 243 Ghibli Published",
  "Monad : 100 Ghibli Published",
  "Avalanche : 30 Ghibli Published",
  "Mantle : 50 Ghibli Published",
];

const NewsTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % newsHeadlines.length);
    }, 3000); // Change headline every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gray-900 text-white py-2 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex items-center">
        <span className="text-yellow-400 font-semibold mr-3 whitespace-nowrap">
          Chains Ghibli News:
        </span>
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-base font-medium"
            >
              {newsHeadlines[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
