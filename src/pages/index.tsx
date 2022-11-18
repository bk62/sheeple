import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {


  return (
    <>

      <main className="container mx-auto flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Sheeple
        </h1>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          Spin a DAO for your community
        </div>
      </main>
    </>
  );
};

export default Home;
