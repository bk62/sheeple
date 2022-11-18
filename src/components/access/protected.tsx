import React from "react"
import { signIn, signOut, useSession } from "next-auth/react";

const Protected: React.FC = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center p-10 md:p-20">
                <h6 className="text-2xl text-gray-300 mb-3">Access Denied</h6>
                <p className="text-sm mb-3 text-gray-400">Please sign to continue.</p>
                <div>
                    <button
                        className="my-2 rounded-md border border-black bg-gray-400 px-2 py-1.5 shadow-lg hover:bg-gray-400"
                        onClick={session ? () => signOut() : () => signIn()}
                    >
                        {session ? "Sign out" : "Sign in"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Protected