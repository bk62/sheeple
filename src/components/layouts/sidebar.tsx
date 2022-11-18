import React, { type ReactNode } from "react";
import Navbar from "../nav/dashboard-navbar";
import Sidebar from "../nav/sidebar";
import Footer from "../nav/footer";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-dashboard grid-rows-dashboard md:grid-rows-dasboard-md min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="bg-dark-gray text-gray-200 col-span-1 row-span-1 md:row-span-2 md:col-span-1">
                <section
                    className="flex flex-col py-8 md:py-16 px-10 md:px-20 bg-mid-gray rounded-2xl shadow-lg min-h-full mx-6 md:ml-0 md:mr-8"
                >
                    {children}
                </section>
            </main>
            < Footer />
        </div>
    );
}

export const getSidebarLayout = (page: ReactNode) => (
    <SidebarLayout>
        {page}
    </SidebarLayout>
);


export default SidebarLayout;