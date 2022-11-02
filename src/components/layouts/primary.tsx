import React, { type ReactNode } from "react";
import Header from "../nav/header";
import Footer from "../nav/footer";


const PrimaryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            < Footer />
        </>
    );
}

export const getPrimaryLayout = (page: ReactNode) => (
    <PrimaryLayout>
        {page}
    </PrimaryLayout>
);

export default PrimaryLayout;