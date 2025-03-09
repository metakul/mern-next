import { useEffect, useState } from 'react';
import { useAddress, useContract, useTokenBalance, Web3Button } from '@thirdweb-dev/react';
import { BigNumber, ethers } from 'ethers';
import ContractInfo from '@/components/ContractInfo/ContractInfo';
import Staking from './Staking';
import UnStaking from './UnStaking';
import MobileTabNavigation from "@/components/MobileTabNav/StakingTab";
import { Container, Typography, Box, Grid } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import { getColors } from '@/layout/Theme/themes';
const tokenContractAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string

const tabs = [
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>Stake</Typography>, content: <Staking />, label: "Stake Now" },
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>UnStake</Typography>, content: <UnStaking />, label: "UnStake Now" },
];

const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string;
const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string;

export default function EarnPage() {
  const [rewardBalance, setRewardBalance] = useState<string | null>(null);
  const { contract } = useContract(stakingContractAddress);
  const [claimableRewards, setClaimableRewards] = useState();
  const { contract:stakingContract, } = useContract(stakingContractAddress);

    const address = useAddress()
  
    const { contract: tokenContract } = useContract(
      tokenContractAddress,
      "token"
    );

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  useEffect(() => {
    const fetchRewardBalance = async () => {
      if (contract) {
        try {
          const response = await contract.call("getRewardTokenBalance");
          const formattedBalance = BigNumber.from(response).div(BigNumber.from(10).pow(18)).toString();
          setRewardBalance(formattedBalance);
        } catch (error) {
          console.error("Failed to fetch reward balance:", error);
        }
      }
    };

    fetchRewardBalance();
  }, [contract]);


    useEffect(() => {
      const fetchBalance = async () => {
        try {
          if (address && stakingContract) {
  
            const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
            setClaimableRewards(stakeInfo[1]);
          }
        } catch (error) {
        }
      };
  
      // Check if address is not null before fetching balance
      if (address !== null) {
        fetchBalance();
      }
  
    }, [address, stakingContract]);
  

  return (
    <Container sx={{mt:8}}>
      <BreadCrumbs currentPath={"/earn"} />
      <Box sx={{
        mt: 4,
        mb: 4,
        p: 3,
        borderRadius: 8,
        boxShadow: 3,
        background:getColors().secondary[900],
        textAlign: 'center',
      }}>
        <Box sx={{
        }}>
          
          <div className="p-1  rounded-lg md:p-4 " id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid  grid-cols-2 gap-2 p-2 mx-auto  sm:grid-cols-2 xl:grid-cols-6 sm:p-">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-md md:text-2xl font-extrabold">1M+</dt>
                <dd className="">Total Rewards</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-md md:text-2xl font-extrabold">

                  {rewardBalance !== null ? `${rewardBalance}` : "Loading..."}
                </dt>
                <dd className="text-sm">Claimable Rewards</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-md md:text-2xl font-extrabold">
                  {rewardBalance !== null ? `${1000000 - Number(rewardBalance)}` : "Loading..."}
                </dt>
                <dd className="">Claimed Rewards</dd>
              </div>
            
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-md md:text-2xl font-extrabold">
                    $KULL
                </dt>
                <dd className="">Crypto To Claim</dd>
              </div>
            
            </dl>
          </div>

        </Box>






        <Typography variant='h4' sx={{ mt: 2, color: 'primary.main' }}>
        </Typography>
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
      </Box>
      <MobileTabNavigation tabs={tabs} position={"top"} />
      <ContractInfo urlBase={`${thirdwebDashboard}/${stakingContractAddress}`} buttonText="Metakul Staking Nft Contract" />
    </Container>
  );
}