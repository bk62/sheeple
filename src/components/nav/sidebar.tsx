import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import Logo from "../misc/logo";

// import NotificationDropdown from "components/Dropdowns/Notification/Dropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";


const navLinks = [
    {
        name: "Dashboard",
        url: "",
        icon: null
    },
    {
        name: "DAOs",
        url: "",
        icon: null
    },
    {
        name: "Proposals",
        url: "",
        icon: null
    },
    {
        name: "Votes",
        url: "",
        icon: null
    },

];

const Sidebar: React.FC = () => {
    // const [collapseShow, setCollapseShow] = React.useState("hidden");
    const router = useRouter();
    return (
        <aside className="row-span-1 col-span-1 md:col-span-1 md:row-span-4 md:row-start-1">
            <nav className="shadow-xl bg-dark-gray text-gray-200  items-center justify-between h-full py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    {/* <button
                        className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-dark-gray m-2 py-3 px-6")}
                    >
                        <FontAwesomeIcon icon={faBars} className="text-white" />
                    </button> */}
                    {/* Brand */}
                    <Logo className="hidden md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap p-4 px-0" />
                    {/* User */}
                    {/* <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative">
                            <UserDropdown />
                        </li>
                    </ul> */}
                    {/* Collapse */}
                    <div
                        className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded "
                    >
                        {/* Collapse header */}
                        {/* <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Logo className="md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap p-4 px-0" />
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        {/* Form */}
                        {/* <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border-0 px-3 py-2 h-12 border border-solid  border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form> */}


                        {/* Navigation */}
                        <ul className="flex justify-between md:flex-col md:min-w-full list-none">
                            {
                                navLinks.map((link, ix) => {
                                    return (
                                        <li className="items-center" key={ix}>
                                            <Link href={link.url}
                                                className={
                                                    "text-xs uppercase py-3  block " +
                                                    (router.pathname.indexOf(link.url) !== -1
                                                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                        : "text-gray-700 hover:text-gray-500")
                                                }
                                            >
                                                {link.icon && (
                                                    <FontAwesomeIcon
                                                        icon={link.icon}
                                                        className={
                                                            "fmr-2 text-sm " +
                                                            (router.pathname.indexOf(link.url) !== -1
                                                                ? "opacity-75"
                                                                : "text-gray-300")
                                                        }
                                                    />
                                                )}
                                                {" "}
                                                {link.name}
                                            </Link>
                                        </li>
                                    )
                                }
                                )
                            }

                        </ul>

                        {/* Divider */}
                        {/* <hr className="my-4 md:min-w-full" /> */}
                        {/* Heading */}
                        {/* <h6 className="md:min-w-full text-gray-500 text-xs uppercase  block pt-1 pb-4 no-underline">
                            DAOs
                        </h6> */}
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;