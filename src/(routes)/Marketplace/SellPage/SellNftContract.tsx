import { useState } from 'react';
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import NftCard from "@/components/Cards/NftCard";
import { BalanceItem } from "@/Datatypes/interfaces/interface";
import { toast } from "react-toastify";
import SellNftDialog from './SellNftDialog'; // Import the dialog component
import {ethers} from "ethers"

const nftMinterContractAddress = import.meta.env.VITE_PUBLIC_NFT_MINTER_CONTRACT as string;
const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string;
const marketPlaceContractAddress = import.meta.env.VITE_PUBLIC_MARKETPLACE_ADDRESS as string;
const tokenAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string;

const currentUnixTime = Math.floor(Date.now() / 1000);

export default function SellNftContract({ nftContractAddress = nftMinterContractAddress }: { nftContractAddress: string }) {
	const address = useAddress();
	const { contract: nftDropContract } = useContract(nftDropContractAddress, "nft-drop");
	const { contract: nftContract } = useContract(nftContractAddress, "nft-drop");
	let { data: ownedNfts, isLoading } = useOwnedNFTs(nftContract, address);
	const { contract: marketPlaceContract } = useContract(marketPlaceContractAddress);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedNftId, setSelectedNftId] = useState<string | null>(null);

	const handleDialogOpen = (id: string) => {
		setSelectedNftId(id);
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
		setSelectedNftId(null);
	};
	const [isSelling, setIsSelling] = useState(false);


const handleSell = async (price: string, days: string) => {
  if (!address || !selectedNftId || !nftContractAddress || !marketPlaceContract) return;

  setIsSelling(true); // Start loading

  try {
    // Approve the marketplace to transfer the NFT
    await nftContract?.setApprovalForAll(marketPlaceContractAddress, true);

    // Calculate the end timestamp based on the number of days
    const endTimestamp = currentUnixTime + (parseInt(days) * 86400); // 86400 seconds in a day

    // Convert price to wei using ethers.js to avoid scientific notation
    const priceInWei = ethers.utils.parseUnits(price, 18).toString(); // Assumes 18 decimals

    // Prepare the _params object for createListing
    const _params = {
      assetContract: nftContractAddress, // Address of the NFT contract
      tokenId: selectedNftId, // Token ID of the NFT
      quantity: "1", // Quantity to list (1 for ERC721)
      currency: tokenAddress, // Currency to accept (token address)
      pricePerToken: priceInWei, // Price per token (in wei)
      startTimestamp: currentUnixTime.toString(), // Start time (current time)
      endTimestamp: endTimestamp.toString(), // End time (current time + days)
      reserved: true, // Whether the listing is reserved
    };

    // Call the createListing function
    const response = await marketPlaceContract.call("createListing", [_params]);

    // Show toast notifications
    await toast.promise(Promise.resolve(response), {
      pending: "Creating Listing...",
      success: "NFT Listed Successfully!",
      error: "Error Listing NFT",
    });

    // Refresh the owned NFTs list
    ownedNfts = await nftDropContract?.erc721.getOwned(address);
  } catch (error) {
    console.error("Error listing NFT:", error);
    toast.error("Failed to list NFT");
  } finally {
    setIsSelling(false); // Stop loading
  }
};
	return (
		<>
			<div className="grid grid-cols-2 gap-[2rem] md:grid-cols-3 lg:grid-cols-4">
				<NftCard
					isLoading={isLoading}
					loadingMessage={"Loading Owned Nfts"}
					balance={ownedNfts as BalanceItem[]}
					handleNftButtonText="Sell"
					onHandleButtonClick={handleDialogOpen}
					address={nftContractAddress}
				/>
			</div>
			<SellNftDialog
			isSelling={isSelling}
				open={dialogOpen}
				onClose={handleDialogClose}
				onSell={handleSell}
			/>
		</>
	);
}