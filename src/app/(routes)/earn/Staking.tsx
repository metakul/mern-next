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


const nftDropContractAddress = "0x710E9161e8A768c0605335AB632361839f761374"
const tokenContractAddress = "0xE9fd323D7B1e4cFd07C657E218F7da16efd6532f"
const stakingContractAddress = "0x7615Cc203dDe705bFD65C42CEAcA7e15eB41b11b"


const Staking = () => {
  const address = useAddress()

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract, } = useContract(stakingContractAddress);
  let { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const [claimableRewards, setClaimableRewards] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && nftDropContract) {

          const stakeInfo = await contract?.call("getStakeInfo", [address]);
          setClaimableRewards(stakeInfo[1]);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Check if address is not null before fetching balance
    if (address !== null && nftDropContract) {
      fetchBalance();
    }

  }, [address, contract, nftDropContract]);

  async function stakeNft(id: unknown) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    if (nftDropContract) {
        const stakeStart = await toast.promise(
          contract?.call("stake", [[id]]), {
            pending: "Staking Now",
            success: "SuccessFully Staked Nft",
            error: "Error while staking",
          }
        );

        ownedNfts = await nftDropContract.erc721.getOwned(address);
    
      console.log(stakeStart)
    }

  }
  return (
    <Container className=''>
      <BreadCrumbs currentPath={location.pathname} />

      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={6} sx={{
          mb: 4
        }}>
          <Typography variant="h3">
            NFT Staking
          </Typography>
        </Grid>
        <Grid item xs={6} className="flex justify-end">
          <Box>
            <ConnectWallet className="max-h-[220px]" />
          </Box>
        </Grid>
      </Grid>

 

      {address ? (
        <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4 mt-4">

          <NftCard balance={ownedNfts as BalanceItem[]} handleNftButtonText={"Stake Now"} onHandleButtonClick={stakeNft} loadingMessage={!address ? 'Loading Owner NFT. Keep Your wallet Conencted.' : "No Nfts to Stake"} />
        </div>
      ) : (
        <Box sx={{
          display:"flex",
          justifyContent:"center",
          mt:12
        }}>
          <Typography variant='h3' sx={{
            mt: 2
          }}>
            Connect Your Wallet To View your Staked NFT&apos;s
          </Typography>
        </Box>
      )}

    </Container>
  );
};

export default Staking;