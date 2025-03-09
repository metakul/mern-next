
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
// import { ethers } from "ethers";
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { toast } from 'react-toastify';
import { BalanceItem } from '@/Datatypes/interfaces/interface';

import NftCard from '@/components/Cards/NftCard';

const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string
const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string


const Staking = () => {
  const address = useAddress()


  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  const { contract:stakingContract, } = useContract(stakingContractAddress);
  let { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);


  async function stakeNft(id: unknown) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(address, stakingContractAddress);
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    if (nftDropContract && stakingContract) {
      const response = stakingContract.call("stake", [[id]]);
      if (response) {
        await toast.promise(
          response, {
          pending: "Staking Now",
          success: "Successfully Staked Nft",
          error: "Error while staking",
        }
        );

        ownedNfts = await nftDropContract.erc721.getOwned(address);
      } else {
        toast.error("Failed to initiate staking");
      }
    } else {
      toast.error("Contract is not available");
    }
  }

  return (
    <Container className=''>

      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} md={6} sx={{
          mb: 4
        }}>
          <Typography variant="h3">
            NFT Staking
          </Typography>
        </Grid>
      
      </Grid>
      {address ? (
        <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4 mt-4">

          <NftCard balance={ownedNfts as BalanceItem[]} handleNftButtonText={"Stake Now"} onHandleButtonClick={stakeNft} loadingMessage={!address ? 'Loading Owner NFT. Keep Your wallet Conencted.' : "No Nfts to Stake"} address={nftDropContractAddress} />
        </div>
      ) : (
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          mt: 12
        }}>
          <Typography variant='h4' sx={{
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