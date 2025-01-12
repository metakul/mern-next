
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
import { ethers } from "ethers";

import NftCard from '@/components/Cards/NftCard';

const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string
const tokenContractAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string
const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string


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

  const { contract:stakingContract, } = useContract(stakingContractAddress);
  let { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  const [claimableRewards, setClaimableRewards] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && stakingContract) {

          const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
          setClaimableRewards(stakeInfo[1]);
        }
      } catch (error) {
        toast.error("Error Loading Rewards")
      }
    };

    // Check if address is not null before fetching balance
    if (address !== null && nftDropContract) {
      fetchBalance();
    }

  }, [address, stakingContract, nftDropContract]);

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
        <Grid item xs={12} md={6} sx={{
        }} >
          {address && claimableRewards &&
            <>
              <Typography className="mt-4" >
                Claimable Balance: <b>
                  {/* {claimableRewards} */}
                  {ethers.utils.formatUnits(claimableRewards, 18)}
                </b>{" "}
                {tokenBalance?.symbol}
              </Typography>
            </>
          }
          <Web3Button
            action={(contract: { call: (arg0: string) => unknown; }) => contract.call("claimRewards")}
            contractAddress={stakingContractAddress}
          >
            Claim Rewards
          </Web3Button>
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