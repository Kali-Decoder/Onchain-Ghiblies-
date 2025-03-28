"use client";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDataContext } from "@/context/DataContext";
import { usePrivy } from "@privy-io/react-auth";
const Navbar = () => {
  const { login, logout, user } = usePrivy();
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadGiblifyImage } = useDataContext();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadFile = async (file: any) => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    setIsUploading(true);
    setProgress(0);
    try {
      let response = await uploadGiblifyImage(username, selectedFile);
      if (response?.success) {
        setUsername("");
        setPreview(null);
        setSelectedFile(null);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <header className="mb-2 px-4 shadow rounded-2xl mt-5 pixel-font">
        <div className="relative mx-auto flex max-w-screen-xl flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <a className="flex items-center text-2xl font-black" href="/">
            <span className="uppercase pixel-font"> 🫶 Ghiblies ❤️</span>
          </a>
          <input className="peer hidden" type="checkbox" id="navbar-open" />
          <label
            className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0"
          >
            <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
              <li className="mt-2 sm:mt-0">
                <button
                  className="rounded-xl cursor-pointer border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => setIsOpen(true)}
                >
                  Upload
                </button>
              </li>

              <li className="mt-2 sm:mt-0">
                <ConnectButton />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/30 z-50 px-4">
          <div className="bg-black rounded-lg p-6 w-full max-w-sm md:max-w-sm lg:max-w-md shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-lg font-medium text-white pixel-font">
                Loyal to your Chain
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col px-2 md:px-4 mt-8">
              <button
                className=" w-2/3 text-white text-sm px-11 py-2 border-[2px] pixel-corners border-white cursor-pointer pixel-font"
                onClick={login}
              >
                Login with Twitter
              </button>
              <div className="mt-6">
                <ConnectButton />
              </div>
              {/* File Upload */}
              <div
                className="relative mt-8 border-[4px] pixel-corners pixel-font rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-800"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <p className="text-gray-500 mt-2 text-center">
                  Drag & Drop or Click to Upload
                </p>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 h-20 w-20 object-cover rounded-lg border border-gray-500"
                  />
                )}

                {isUploading && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-white text-sm">
                      {progress}% Uploading...
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4">
              <button
                onClick={uploadFile}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
