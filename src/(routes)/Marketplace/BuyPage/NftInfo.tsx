



import { BalanceItem } from '@/Datatypes/interfaces/interface';
import { ConnectWallet, useAddress, useContract, useNFT } from '@thirdweb-dev/react';
import NftCard from '@/components/Cards/NftCard';
import { toast } from 'react-toastify';

export const svgStyle = {
	fill: '#5893f9', // Set your desired fill color here
	height: '1em',
};
const marketPlaceContractAddress = import.meta.env.VITE_PUBLIC_MARKETPLACE_ADDRESS as string
const tokenContractAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string

const NftInfo = ({ nftDropContractAddress, tokenId,auctionId,buyoutBidAmount }: { nftDropContractAddress: string, tokenId: string ,auctionId:string ,buyoutBidAmount:string}) => {
const address=useAddress()
	const { contract: nftDropContract } = useContract(
		nftDropContractAddress,
		"nft-drop"
	);
	// const { contract: tokenContract } = useContract(
	// 	tokenContractAddress,
	// 	"token"
	// );
	const { contract:marketPlaceContract } = useContract(marketPlaceContractAddress);
	const { contract:tokenContract } = useContract(tokenContractAddress);

	const { data: nft, isLoading, error } = useNFT(nftDropContract, tokenId);
	async function sellNft(id: unknown) {
		try{
		if (!address) return;

		  const setApproval = await tokenContract?.call("approve", [marketPlaceContractAddress, buyoutBidAmount]);
		console.log("approved",setApproval);
		

		if (nftDropContract && marketPlaceContract) {
			const response = marketPlaceContract.call("bidInAuction", [auctionId,buyoutBidAmount]);
			if (response) {
			  await toast.promise(
				response, {
				pending: "Buying Now",
				success: "Bought Successfully",
				error: "Error while Buying",
			  }
			  );
	  
			} else {
			  toast.error("Failed to initiate staking");
			}
		  } else {
			toast.error("Contract is not available");
		  }
		}
		catch(e){
			console.log(e)
		}	
	}

	return (
		<div className="">
			<NftCard isLoading={isLoading} balance={[nft] as BalanceItem[]} loadingMessage='' handleNftButtonText={"Buy Now"} onHandleButtonClick={sellNft} address={nftDropContractAddress} buyoutBidAmount={buyoutBidAmount} />
		</div>
	);
};

export default NftInfo;
