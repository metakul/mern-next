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
import { toast } from 'react-toastify';
import { BalanceItem } from '@/Datatypes/interfaces/interface';

import NftCard from '@/components/Cards/NftCard';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';


const nftDropContractAddress = process.env.NEXT_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string

const Marketplace = () => {
  const address = useAddress()


  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  let { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);


  const buyNft = () => {
    console.log("Nft Bought");

  }
  return (
    <Container>

      <Container className=''>
        <BreadCrumbs currentPath={"/"} />

        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={6} sx={{
            mb: 4
          }}>
            <Typography variant="h3">
              NFT Marketplace
            </Typography>
          </Grid>
          <Grid item xs={6} className="flex justify-end">
            <Box>
              <ConnectWallet className="max-h-[220px]" />
            </Box>
          </Grid>
        </Grid>
        <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4 mt-4">
          <NftCard balance={ownedNfts as BalanceItem[]} handleNftButtonText={"Buy Now"} onHandleButtonClick={buyNft} loadingMessage={!address ? 'Loading Owner NFT. Keep Your wallet Conencted.' : "No Nfts to Stake"} />
        </div>
      </Container>
    </Container>
  );
};

export default Marketplace;