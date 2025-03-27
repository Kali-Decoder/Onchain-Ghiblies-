"use client";
import Navbar from "@/components/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import ImageGallery from "@/components/ImageGallery";
import NewsTicker from "@/components/NewsTicker";
import { chainArray } from "@/utils/chains";
import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { getAllGibhlifies } = useDataContext();
  const handleFilerButton = async (id) => {
    await getAllGibhlifies(id);
  };
  return (
    <>
      <Navbar />
      <NewsTicker />
      <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-10 gap-4 p-4 pixel-font">
        <button
          onClick={async () => {
            setActiveIndex(0);
            await handleFilerButton(0);
          }}
          className={`bg-white cursor-pointer text-black p-2 rounded-lg text-xs transition-all duration-300
            ${
              activeIndex == 0 ? "animate-pulse text-blue-400 bg-amber-200" : ""
            }`}
        >
          All
        </button>
        {chainArray.map((chain, index) => (
          <button
            key={index}
            onClick={async () => {
              setActiveIndex(chain.id);
              await handleFilerButton(chain.id);
            }}
            className={`bg-white cursor-pointer text-black p-2 rounded-lg text-xs transition-all duration-300
            ${
              activeIndex == chain.id
                ? "animate-pulse text-blue-400 bg-amber-200"
                : ""
            }`}
          >
            {chain.name}
          </button>
        ))}
      </div>
      <div className="container-gg pixel-font">
        <ImageGallery />
      </div>
    </>
  );
}
