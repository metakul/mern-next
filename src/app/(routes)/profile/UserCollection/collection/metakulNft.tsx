'use client'
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
// import { ethers } from "ethers";
import { ConnectWallet, Web3Button, useAddress, useContract, useOwnedNFTs, useTokenBalance } from '@thirdweb-dev/react';
import { BalanceItem } from '@/Datatypes/interfaces/interface';

import NftCard from '@/components/Cards/NftCard';


const nftDropContractAddress = process.env.NEXT_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string
const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string
const stakingContractAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as string


const MyMetakulNft = () => {
  const address = useAddress()


  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract, } = useContract(stakingContractAddress);
  let { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);



  return (

    <Grid container sx={{ mt: 4 }}>

     
      {address ? (
        <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4 mt-4">

          <NftCard balance={ownedNfts as BalanceItem[]} handleNftButtonText={"Stake Now"} loadingMessage={!address ? 'Loading Owner NFT. Keep Your wallet Conencted.' : "No Nfts Owned"} />
        </div>
      ) : (
        <Typography variant='h3' sx={{
          mt: 2
        }}>
          Connect Your Wallet To View your NFT&apos;s
        </Typography>
      )}
    </Grid>

  );
};

export default MyMetakulNft;