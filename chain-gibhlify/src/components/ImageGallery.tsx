"use client";
import { useDataContext } from "@/context/DataContext";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaShareAlt } from "react-icons/fa";
const ImageGallery = () => {
  const { gibhlifies } = useDataContext();
  return (
    <>
      <div className="image-gallery">
        {gibhlifies.length > 0 ? (
          gibhlifies.map((user: any, index: number) =>
            user.images.map((img: any, imgIndex: number) => (
              <div
                key={`${user.uname}-${imgIndex}`}
                className="content-wrapper"
              >
                <div className="image-wrapper gap-3">
                  <div className="overlay">
                    <div>
                      <p className="text-sm">{user.uname}</p>
                        <p className="text-xs">{img.chainId}</p>
                    </div>
                    <div>
                      <button className="spheric-button"><FaXTwitter/></button>
                      <button className="round-button">
                        <FaShareAlt color="white" />
                      </button>
                      <button className="round-button">
                        <HiDotsHorizontal color="white" />
                      </button>
                    </div>
                  </div>
                  <img src={img?.url?.replace("../chain-gibhlify/public", "")} alt="Uploaded Content" />
                </div>
              </div>
            ))
          )
        ) : (
          <>No Data</>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
