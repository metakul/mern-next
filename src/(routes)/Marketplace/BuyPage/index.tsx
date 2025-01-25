


import { Container, Skeleton, Stack } from '@mui/material';
import { useContract } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import NftInfo from './NftInfo';

const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_MINTER_CONTRACT as string
const marketPlaceContractAddress = import.meta.env.VITE_PUBLIC_MARKETPLACE_ADDRESS as string

export const svgStyle = {
	fill: '#5893f9', 
	height: '1em',
};
const BuyPage = () => {

	const { contract: nftDropContract } = useContract(
		nftDropContractAddress,
		"nft-drop"
	);
	interface AuctionNft {
		assetContract: string;
		tokenId: string;
		auctionId:string
		buyoutBidAmount:string
		auctionCreator:string
	}
	const [auctionNfts, setAuctionNfts] = useState<AuctionNft[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { contract: marketPlaceContract } = useContract(marketPlaceContractAddress);

	async function fetchMarketplaceNft() {
		setLoading(true)
		if (nftDropContract && marketPlaceContract) {

			const totalAuctions = await marketPlaceContract.call("totalAuctions", [])
			
			const totalAuctionDecimal = parseInt(totalAuctions._hex, 16)-1
			
			const response = await marketPlaceContract.call("getAllValidAuctions", [0, totalAuctionDecimal])
			console.log("response",response);
			
			// Extract 'assetContract' from each auction object in the response
			const auctionData = response.map((auction: any) => ({
				assetContract: auction.assetContract,
				tokenId: parseInt(auction.tokenId._hex, 16),
				auctionId: parseInt(auction.auctionId._hex, 16),
				buyoutBidAmount: parseInt(auction.buyoutBidAmount._hex, 16),
				auctionCreator: auction.auctionCreator,
			  }));
			  

			setAuctionNfts(auctionData);
			console.log(auctionData);
		}
		setLoading(false)
	}

	// Call fetchMarketplaceNft when the component mounts or when the contracts are ready
	useEffect(() => {
		if (nftDropContract && marketPlaceContract) {
			fetchMarketplaceNft();
		}
	}, [nftDropContract, marketPlaceContract]);


	return (
		<Container className="">
			<div className="container flex justify-center">
				<div className="text-center ">
					<figure className="mb-4">
					</figure>
					<h2 className=" font-sans  mb-8 font-display text-2xl font-medium ">Metakul NFT Marketplace</h2>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-[2rem] md:grid-cols-3 lg:grid-cols-4">
				{auctionNfts && auctionNfts.map((nft) => (
					<NftInfo
						key={`${nft.assetContract}-${nft.tokenId}`}
						nftDropContractAddress={nft.assetContract}
						tokenId={nft.tokenId}
						auctionId={nft.auctionId}
						buyoutBidAmount={nft.buyoutBidAmount}
						// auctionCreator={nft.auctionCreator}
					/>
				))}
				{loading && 
				<>
				   <Stack  spacing={1} className="relative py-4 mt-4">
				   <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">
					 <div className="rounded-[1.25rem] p-4 flex-row justify-center">
					   <Skeleton variant="rounded" width={'100%'} height={'300px'} />
					 </div>
				   </div>
				 </Stack>
				   <Stack  spacing={1} className="relative py-4 mt-4">
				   <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">
					 <div className="rounded-[1.25rem] p-4 flex-row justify-center">
					   <Skeleton variant="rounded" width={'100%'} height={'300px'} />
					 </div>
				   </div>
				 </Stack>
				   <Stack  spacing={1} className="relative py-4 mt-4">
				   <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">
					 <div className="rounded-[1.25rem] p-4 flex-row justify-center">
					   <Skeleton variant="rounded" width={'100%'} height={'300px'} />
					 </div>
				   </div>
				 </Stack>
				</>

				}
			</div>
		</Container>
	);
};

export default BuyPage;
