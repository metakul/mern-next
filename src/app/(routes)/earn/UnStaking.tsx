'use client'
import { ConnectWallet, Web3Button, useAddress, useTokenBalance } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Box, Container, Grid, Typography } from "@mui/material";

import SingleNftCard from "@/components/Cards/SingleNftCard";
import BreadCrumbs from "@/components/Elements/BreadCrumbs";

const nftDropContractAddress = "0x710E9161e8A768c0605335AB632361839f761374"
const tokenContractAddress = "0xE9fd323D7B1e4cFd07C657E218F7da16efd6532f"
const stakingContractAddress = "0x7615Cc203dDe705bFD65C42CEAcA7e15eB41b11b"


const Mywallet = () => {
  const address = useAddress();
  const [, setLoading] = useState(true); // New loading state
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract } = useContract(stakingContractAddress);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);

  const [claimableRewards, setClaimableRewards] = useState();
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && nftDropContract) {
          setLoading(false);

          const stakeInfo = await contract?.call("getStakeInfo", [address]);
          setClaimableRewards(stakeInfo[1]);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Check if address is not null before fetching balance
    if (address !== null && nftDropContract) {
      setLoading(true);
      fetchBalance();
    }

  }, [address, contract, nftDropContract]);

  return (
    <Container className=''>
      <BreadCrumbs currentPath={"/earn"} />
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={6} sx={{ mb: 4 }}>
          <Typography variant="h3">
            NFT Unstaking
          </Typography>
        </Grid>
        <Grid item xs={6} className="flex justify-end">
          <Box>
            <ConnectWallet className="max-h-[220px]" />
          </Box>
        </Grid>
      </Grid>

      {address && claimableRewards &&
      <>
        <Typography className="mt-4" >
          Claimable Balance: <b>
            {/* {claimableRewards} */}
            {ethers.utils.formatUnits(claimableRewards, 18)}
          </b>{" "}
          {tokenBalance?.symbol}
        </Typography>
          <Web3Button
          action={(contract: { call: (arg0: string) => unknown; }) => contract.call("claimRewards")}
          contractAddress={stakingContractAddress}
        >
          Claim Rewards
        </Web3Button>
      </>
        
        }

      <section className="relative py-2">

        <Box className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {stakedTokens && stakedTokens[0].length > 0 ? (
          stakedTokens[0]?.map((stakedToken: { toNumber: () => any; toString: () => any; }) => (
              <SingleNftCard
                tokenId={stakedToken.toNumber()}
                key={stakedToken.toString()}
              />
            ))
          ) : (
            <Box sx={{
              display:"flex",
              justifyContent:"center",
              mt:12
            }}>
          <Typography variant="h3" sx={{
            mt: 2
          }}>
            No NFT&apos;s To UnStake
          </Typography>
          </Box>
        )}
        </Box>
      </section>
    </Container >
  );
};

export default Mywallet;


