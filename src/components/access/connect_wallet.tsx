import React from "react"

import { useConnect, useAccount } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Button from "../controls/buttons"



const ConnectWallet: React.FC<{ message?: string }> = ({ message = "" }) => {
    // wagmi
    // const { isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    });


    return (
        <>
            <div className="flex-1 flex flex-col items-center justify-center p-10 md:p-20">
                <h6 className="text-3xl text-gray-300 mb-5">Connect Wallet</h6>
                {
                    message && (
                        <p className="text-sm mb-1 text-gray-400">
                            {message}
                        </p>
                    )
                }
                <p className="text-sm mb-3 text-gray-400">
                    Please connect your MetaMask wallet to continue.
                </p>
                <div className="mt-2">
                    <Button
                        className="my-2"
                        type="button"
                        variant="primary"
                        onClick={() => connect()}
                    >
                        Connect Wallet
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ConnectWallet