import React, { type ReactNode } from "react";
import Navbar from "../nav/navbar";
import Footer from "../nav/footer";
import Container from "./container";



const PrimaryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="bg-mid-gray">
                <section className="relative w-full h-full py-40 min-h-screen">
                    {children}
                </section>
            </main>
            < Footer />
        </>
    );
}

export const getPrimaryLayout = (page: ReactNode) => (
    <PrimaryLayout>
        {page}
    </PrimaryLayout>
); ``

export default PrimaryLayout;