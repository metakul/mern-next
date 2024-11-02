import React, { useEffect, useState } from "react";
import {
  getAllValidAuctions,
  getAllValidListings,
} from "thirdweb/extensions/marketplace";
import { NFT as NFTType, ThirdwebContract } from "thirdweb";
import NFTGrid, { NFTGridLoading } from "../NFTGRID/NFTGrid";
import { MARKETPLACE, NFT_COLLECTION } from "../../const/contracts";

type Props = {
  marketplace: ThirdwebContract;
  collection: ThirdwebContract;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText: string;
};

export default function ListingGrid(props: Props) {
  const [nftData, setNftData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsPromise = getAllValidListings({
          contract: MARKETPLACE,
        });
        const auctionsPromise = getAllValidAuctions({
          contract: MARKETPLACE,
        });

        const [listings, auctions] = await Promise.all([
          listingsPromise,
          auctionsPromise,
        ]);

        // Retrieve all NFTs from the listings
        const tokenIds = Array.from(
          new Set([
            ...listings
              .filter((l) => l.assetContractAddress === NFT_COLLECTION.address)
              .map((l) => l.tokenId),
            ...auctions
              .filter((a) => a.assetContractAddress === NFT_COLLECTION.address)
              .map((a) => a.tokenId),
          ])
        );

        const nftData = tokenIds.map((tokenId) => {
          return {
            tokenId: tokenId,
            directListing: listings.find(
              (listing) => listing.tokenId === tokenId
            ),
            auctionListing: auctions.find(
              (listing) => listing.tokenId === tokenId
            ),
          };
        });

        setNftData(nftData);
      } catch (error) {
        console.error("Failed to fetch listings and auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <NFTGridLoading />;
  }

  return (
    <NFTGrid
      nftData={nftData}
      emptyText={props.emptyText}
      overrideOnclickBehavior={props.overrideOnclickBehavior}
    />
  );
}