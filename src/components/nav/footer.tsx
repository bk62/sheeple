import React from "react";

const Footer: React.FC = () => {
    return (
        <>
            <footer className="block py-4 bg-dark-gray text-gray-300 row-span-1 row-start-4 md:col-start-2 col-span-1">
                <div className="container mx-auto px-4">
                    <div className="flex items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-xs text-blueGray-500 font-semibold py-1 text-center md:text-left">
                                Copyright © 2022 {" "}
                            </div>
                        </div>
                        <div className="w-full md:w-8/12 px-4">
                            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                                <li>
                                    <a
                                        href="/docs"
                                        className="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                                    >
                                        Docs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/bk62"
                                        className="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                                    >
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}


export default Footer;