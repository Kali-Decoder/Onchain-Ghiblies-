import Navbar from "@/components/Navbar";
import Image from "next/image";
import "@rainbow-me/rainbowkit/styles.css";
import ImageGallery from "@/components/ImageGallery";
import NewsTicker from "@/components/NewsTicker";
export default function Home() {
  return (
    <>
      <Navbar />
      <NewsTicker />
      <div className="container-gg">
        <ImageGallery />
      </div>
    </>
  );
}
