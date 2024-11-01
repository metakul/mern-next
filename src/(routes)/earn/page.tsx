import { useEffect, useState } from 'react';
import { useContract } from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';
import ContractInfo from '@/components/ContractInfo/ContractInfo';
import Staking from './Staking';
import UnStaking from './UnStaking';
import MobileTabNavigation from "@/components/MobileTabNav/StakingTab";
import { Container, Typography, Box } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import { getColors } from '@/layout/Theme/themes';

const tabs = [
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>Stake</Typography>, content: <Staking />, label: "Stake Now" },
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>UnStake</Typography>, content: <UnStaking />, label: "UnStake Now" },
];

const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string;
const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string;

export default function EarnPage() {
  const [rewardBalance, setRewardBalance] = useState<string | null>(null);
  const { contract } = useContract(stakingContractAddress);

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

  return (
    <Container sx={{mt:18}}>
      <BreadCrumbs currentPath={"/earn"} />
      <Box sx={{
        mt: 4,
        mb: 4,
        p: 3,
        borderRadius: 8,
        boxShadow: 3,
        background:getColors().grey[800],
        textAlign: 'center',
      }}>
        <Box sx={{
        }}>
          
          <div className="p-4  rounded-lg md:p-4 " id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-2 mx-auto  sm:grid-cols-2 xl:grid-cols-6 sm:p-4">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">1M+</dt>
                <dd className="">Total Rewards</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">

                  {rewardBalance !== null ? `${rewardBalance}` : "Loading..."}
                </dt>
                <dd className="">Claimable Rewards</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">
                  {rewardBalance !== null ? `${100100 - Number(rewardBalance)}` : "Loading..."}
                </dt>
                <dd className="">Claimed Rewards</dd>
              </div>
            
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">
                    $KULL
                </dt>
                <dd className="">Crypto To Claim</dd>
              </div>
            
            </dl>
          </div>

        </Box>






        <Typography variant='h4' sx={{ mt: 2, color: 'primary.main' }}>
        </Typography>
      </Box>
      <MobileTabNavigation tabs={tabs} position={"top"} />
      <ContractInfo urlBase={`${thirdwebDashboard}/${stakingContractAddress}`} buttonText="Metakul Staking Nft Contract" />
    </Container>
  );
}