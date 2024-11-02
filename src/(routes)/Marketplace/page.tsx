import React, { Suspense } from "react";
import { NFTGridLoading } from "@/components/NFTGRID/NFTGrid";
import ListingGrid from "@/components/ListingGrid/ListingGrid";
import {MARKETPLACE, NFT_COLLECTION} from "@/const/contracts";

export default function MarketPlace() {
	return (
		<div className="">
			<h1 className="text-4xl">Buy NFTs</h1>

			<div className="my-8">
				<Suspense fallback={<NFTGridLoading />}>
					<ListingGrid
						marketplace={MARKETPLACE}
						collection={NFT_COLLECTION}
						emptyText={
							"Looks like there are no listed NFTs in this collection. Instead Create and Sell your own NFTs"
						}
					/>
				</Suspense>
			</div>
		</div>
	);
}