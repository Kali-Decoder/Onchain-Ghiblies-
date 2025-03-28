"use client";
import { useDataContext } from "@/context/DataContext";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaShareAlt } from "react-icons/fa";
const ImageGallery = () => {
  const { gibhlifies } = useDataContext();

  // Flatten all images into a single array while keeping track of user info
  const allImages =
    gibhlifies?.flatMap((user: any) =>
      user.images.map((img: any) => ({
        uname: user.uname,
        chainId: img.chainId,
        url: img.url,
      }))
    ) || [];

  // Split images into multiple columns
  const columns: any[][] = [[], [], []];
  allImages.forEach((image, index) => {
    columns[index % 3].push(image);
  });

  return (
    <div
      className="image-gallery pixel-font"
      style={{ display: "flex", gap: "2em" }}
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="column">
          {column.map((img, imgIndex) => (
            <div key={`${img.uname}-${imgIndex}`} className="content-wrapper">
              <div className="image-wrapper gap-3">
                <div className="overlay">
                  <div className="flex justify-between">
                    {" "}
                    <p className="text-sm">{img.uname}</p>
                    <p className="text-sm">{img.chainId}</p>
                  </div>
                  <div>
                    <a
                      className="spheric-button"
                      href={`https://x.com/${img.uname}`}
                    >
                      <FaXTwitter />
                    </a>
                    <button className="round-button">
                      <FaShareAlt color="white" />
                    </button>
                    <button className="round-button">
                      <HiDotsHorizontal color="white" />
                    </button>
                  </div>
                </div>
                <img
                  src={img.url.replace("../chain-gibhlify/public", "")}
                  alt="Uploaded Content"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
