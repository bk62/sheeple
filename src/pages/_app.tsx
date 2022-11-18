// import { type AppType } from "next/app";
import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";


// THIRD PARTY:

// Wagmi
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { getDefaultProvider } from "ethers";

const wagmiClient = createClient({
  autoConnect: true,
  // hardhat:
  provider: getDefaultProvider("http://localhost:8545")
})

// Next font

import { Inter } from "@next/font/google";
const inter = Inter();


// font awesome

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


// APP SPECIFIC:

import { trpc } from "../utils/trpc";

import { getPrimaryLayout } from "../components/layouts/primary";
import "../styles/globals.css";
import type { NextPageWithLayout } from "./page";


type AppPropsWIthLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout
}


// Orig:
// const MyApp: AppType<{ session: Session | null }> = ({
//   Component,
//   pageProps: { session, ...pageProps },
// }) => {
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWIthLayout<{ session: Session | null }>): JSX.Element => {
  const getLayout = Component.getLayout ?? getPrimaryLayout;
  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider session={session}>
        <Head>
          <title>sheeple</title>
          <link rel="icon" href="/favicon.ico" />
          <style>
            {`
            body {
              font-family: ${inter.style.fontFamily}, sans-serif;
              font-feature-settings: kern;
            }
            `}
          </style>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </WagmiConfig>
  );
};

export default trpc.withTRPC(MyApp);
