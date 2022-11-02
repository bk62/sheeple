// import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { trpc } from "../utils/trpc";

import PrimaryLayout, { getPrimaryLayout } from "../components/layouts/primary";
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
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
