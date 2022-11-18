import React from "react"

import { useConnect, useAccount } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const ConnectWallet: React.FC = () => {
    // wagmi
    // const { isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    });


    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center p-10 md:p-20">
                <h6 className="text-2xl text-gray-300 mb-3">Connect Wallet</h6>
                <p className="text-sm mb-3 text-gray-400">Please connect your MetaMask wallet to continue.</p>
                <div>
                    <button
                        className="my-2 rounded-md border border-black bg-gray-400 px-2 py-1.5 shadow-lg hover:bg-gray-400"
                        onClick={() => connect()}
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        </>
    );
}

export default ConnectWallet