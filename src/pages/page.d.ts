import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";


export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P,> & {
    getLayout?: (_page: ReactElement) => ReactNode
}