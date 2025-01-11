import React from "react";
import SellNftContract from "./SellNftContract";

// Array of NFT contract addresses
const nftContractAddresses: string[] = [
    import.meta.env.VITE_PUBLIC_NFT_MINTER_CONTRACT as string,
    import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string,
];

export default function Sellpage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Your Available Nfts for Sale</h1>
            {nftContractAddresses.map((address) => (
                <div className="mt-6">
                    <SellNftContract key={address} nftContractAddress={address} />
                </div>
            ))}
        </div>
    );
}
