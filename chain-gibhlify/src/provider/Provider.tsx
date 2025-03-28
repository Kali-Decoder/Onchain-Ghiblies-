"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import DataContextProvider from "@/context/DataContext";
import { wagmiConfig } from "@/utils/wallet-utils";
const queryClient = new QueryClient();
const Providers = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <PrivyProvider
              appId={`${process.env.NEXT_PUBLIC_PRIVY_APP_ID}`}
              config={{
                appearance: {
                  theme: "light",
                  accentColor: "#676FFF",
                  logo: "https://media.wired.com/photos/64f9d24e1b27a741aa23c0dd/master/pass/Studio-Ghibli-Ranked-Culture-HERON_img_1.jpg",
                },
              }}
            >
              <DataContextProvider>{children}</DataContextProvider>
            </PrivyProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </>
  );
};

export default Providers;
