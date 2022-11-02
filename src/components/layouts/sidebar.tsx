import React, { type ReactNode } from "react";
import PrimaryLayout from "./primary";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PrimaryLayout>
            <p>Sidebar</p>
            {children}
        </PrimaryLayout>
    );
}

export const getSidebarLayout = (page: ReactNode) => (
    <SidebarLayout>
        {page}
    </SidebarLayout>
);


export default SidebarLayout;