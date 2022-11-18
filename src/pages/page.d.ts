import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";


export type WithGetLayout = {
    getLayout?: (page: ReactElement) => ReactNode
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P,> & WithGetLayout
// {
//     getLayout?: (page: ReactElement) => ReactNode
// }