import React from "react";
import SellNftContract from "./SellNftContract";

// Array of NFT contract details with address and name
const nftContracts = [
    {
        address: import.meta.env.VITE_PUBLIC_NFT_MINTER_CONTRACT as string,
        name: "Coummunity NFT Collection",
    },
    {
        address: import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string,
        name: "Metakul 777 Collection",
    },
];

export default function Sellpage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Your Available NFTs for Sale</h1>
            {nftContracts.map(({ address, name }) => (
                <div key={address} className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">{name}</h2>
                    <SellNftContract nftContractAddress={address} />
                </div>
            ))}
        </div>
    );
}
