import React from "react";
// import { useEnsName } from "wagmi";
import truncateMiddle from "truncate-middle"

interface WalletDisplayProps {
    address: string;
    start?: number;
    end?: number;
    className?: string;
    resolveEns?: boolean;
}

const WalletDisplay: React.FC<WalletDisplayProps> = ({ className = "", resolveEns = false, address, start = 5, end = 4 }) => {
    if (!address.startsWith("0x")) {
        address = `0x${address}`;
    }
    // const { data: ensName } = useEnsName({ address: address as `0x${string}`, enabled: resolveEns });

    return (
        <span className={`${className}`}>
            {
                // ensName ||
                truncateMiddle(address, start, end, "...")
            }
        </span>
    )
}
export default WalletDisplay;