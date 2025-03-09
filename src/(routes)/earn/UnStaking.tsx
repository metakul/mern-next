
import { useAddress } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Box, Container, Grid, Typography } from "@mui/material";

import SingleNftCard from "@/components/Cards/SingleNftCard";

const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string

const Mywallet = () => {
  const address = useAddress();
 
  const { contract:stakingContract } = useContract(stakingContractAddress);
  const { data: stakedTokens } = useContractRead(stakingContract, "getStakeInfo", [
    address,
  ]);

  return (
    <Container className=''>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} md={6} sx={{ mb: 4 }}>
          <Typography variant="h3">
            NFT Unstaking
          </Typography>
        </Grid>
      </Grid>
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
              display: "flex",
              justifyContent: "center",
              mt: 12
            }}>
              <Typography variant="h4" sx={{
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


