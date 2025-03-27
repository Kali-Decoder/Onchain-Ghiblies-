"use client";
import React, { useState, useEffect, ReactNode, use } from "react";
import { useAccount } from "wagmi";
import axiosInstance from "@/config";
interface DataContextProps {
  uploadGiblifyImage: (uname: string, file: any) => void;
  getAllGibhlifies: (chainId: number) => void;
  gibhlifies: any;
}
import { toast } from "react-hot-toast";
import axios from "axios";
interface DataContextProviderProps {
  children: ReactNode;
}

// Context initialization
const DataContext = React.createContext<DataContextProps | undefined>(
  undefined
);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const { chain } = useAccount();
  const [gibhlifies, setGibhlifies] = useState([]);
  const [activeChain, setActiveChainId] = useState<number | undefined>(
    chain?.id
  );

  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);
  const { address } = useAccount();
  const uploadGiblifyImage = async (uname: string, file: any) => {
    if (!activeChain || !address) return;

    if (!file) {
      console.error("No file selected!");
      return;
    }
    let id = toast.loading("Uploading Ghibli...");
    try {
      const formData = new FormData();
      formData.append("uname", uname);
      formData.append("chainId", activeChain?.toString());
      formData.append("address", address);
      formData.append("imageUpload", file);
      // Send request with correct headers

      console.log(formData, "formData");
      let response = await axiosInstance.post("/api/upload", formData);
      console.log("Upload Success:", response.data);
      toast.success("Ghibli Uploaded Successfully", { id });
      await getAllGibhlifies();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Ghibli Upload Failed", { id });
    }
  };

  const getAllGibhlifies = async (chainId = 0) => {
    try {
      let response;
      let url = `http://localhost:8080/api/all-gibhlifys`;
      if (chainId) {
        url += `?chainId=${chainId}`;
        response = await axios.get(url);
      } else {
        response = await axios.get(url);
      }
      setGibhlifies(response?.data?.gibhlifys);
    } catch (error) {
      console.error("Error fetching gibhlifies:", error);
    }
  };
  useEffect(() => {
    getAllGibhlifies();
  }, []);
  return (
    <DataContext.Provider
      value={{ uploadGiblifyImage, getAllGibhlifies, gibhlifies }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
