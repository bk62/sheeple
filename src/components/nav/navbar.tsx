
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

import Logo from "../misc/logo";


const Navbar: React.FC = (props) => {
    const { data: session } = useSession();

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="bg-dark-gray border-b border-gray-500 top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Logo className="inline-block mr-4 py-2 whitespace-nowrap" />
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} className="text-white" />
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center bg-dark-gray lg:bg-opacity-0 lg:shadow-none" +
                            (navbarOpen ? " block rounded shadow-lg" : " hidden")
                        }
                        id="example-navbar-warning"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="flex items-center">
                                <a
                                    className="lg:text-white lg:hover:text-blueGray-200 text-gray-300 px-3 py-4 lg:py-2 flex items-center text-xs uppercase "
                                    href=""
                                >
                                    {/* <i className="lg:text-blueGray-200 text-blueGray-400 text-lg leading-lg mr-2" />{" "} */}
                                    DAOs
                                </a>
                            </li>

                            {/* <li className="flex items-center">
                                <a
                                    className="lg:text-white lg:hover:text-blueGray-200 text-gray-300 px-3 py-4 lg:py-2 flex items-center text-xs uppercase "
                                    href=""
                                >
                                    <FontAwesomeIcon icon={faRegistered} />{" "}
                                    Sign up
                                </a>
                            </li> */}

                            <li className="flex items-center">
                                <button
                                    className="bg-dark-purple text-gray-100 active:bg-blueGray-50 text-xs uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={session ? () => signOut : () => signIn()}
                                >
                                    <FontAwesomeIcon icon={session ? faSignOut : faSignIn} className="pr-1 text-xss" />{" "}
                                    {session ? "Sign Out" : "Sign In"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}


export default Navbar;