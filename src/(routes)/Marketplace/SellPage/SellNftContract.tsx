import { RequiredParam, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import NftCard from "@/components/Cards/NftCard";
import { BalanceItem } from "@/Datatypes/interfaces/interface";
import { toast } from "react-toastify";
import Request from "@/Backend/axiosCall/apiCall";

const nftMinterContractAddress = import.meta.env.VITE_PUBLIC_NFT_MINTER_CONTRACT as string
const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string
const marketPlaceContractAddress = import.meta.env.VITE_PUBLIC_MARKETPLACE_ADDRESS as string
const tokenAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string
const polAddress = "0x0000000000000000000000000000000000001010"
const currentUnixTime = Math.floor(Date.now() / 1000);


export default function SellNftContract({ nftContractAddress= nftMinterContractAddress}: { nftContractAddress: string }) {
	const address = useAddress()
	const { contract: nftDropContract } = useContract(
		nftDropContractAddress,
		"nft-drop"
	);
	const { contract: nftContract } = useContract(
		nftContractAddress,
		"nft-drop"
	);
	let { data: ownedNfts, isLoading } = useOwnedNFTs(nftContract, address);
	const { contract: marketPlaceContract } = useContract(marketPlaceContractAddress);
	async function sellNft(id: string, nftContractAddress?: string) {

		if (!address) return;

		await nftContract?.setApprovalForAll(marketPlaceContractAddress, true);

		if (nftDropContract && marketPlaceContract) {
			const response = marketPlaceContract.call("createAuction", [[nftContractAddress, id, "1", tokenAddress, "10", "15", "10000", "20000", currentUnixTime, "1739179773"]]);
			if (response) {
				await toast.promise(
					response, {
					pending: "Auctioning Now",
					success: "Auctioned Successfully",
					error: "Error while Auctioning",
				}
				);
				const apiCAll = await Request({
					endpointId: "ADD_NFT_INFO_WHILE_SELLING_IN_MARKETPLACE",
					slug: `/${id}`,
					data: {
						address,
						nftContractAddress,
						marketPlaceContractAddress
					},
				});
				ownedNfts = await nftDropContract.erc721.getOwned(address);
			} else {
				toast.error("Failed to initiate staking");
			}
		} else {
			toast.error("Contract is not available");
		}
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-[2rem] md:grid-cols-2 lg:grid-cols-4">
				<NftCard isLoading={isLoading} loadingMessage={""} balance={ownedNfts as BalanceItem[]} handleNftButtonText="Sell" onHandleButtonClick={sellNft} address={nftContractAddress} />
			</div>
		</>

	);
}