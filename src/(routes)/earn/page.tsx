import { useEffect, useState } from 'react';
import { useContract } from '@thirdweb-dev/react';
import { BigNumber } from 'ethers';
import ContractInfo from '@/components/ContractInfo/ContractInfo';
import Staking from './Staking';
import UnStaking from './UnStaking';
import MobileTabNavigation from "@/components/MobileTabNav/StakingTab";
import { Container, Typography, Box } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';

const tabs = [
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>Stake</Typography>, content: <Staking/>, label: "Stake Now" },
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>UnStake</Typography>, content: <UnStaking/>, label: "UnStake Now" },
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
    <Container>
      <BreadCrumbs currentPath={"/"} />
      <Box sx={{
        mt: 4,
        mb: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
        textAlign: 'center'
      }}>
        <Typography variant='h3' className='font-display text-3xl font-bold'>
          Remaining Rewards To Claim:
        </Typography>
        <Typography variant='h4' sx={{ mt: 2, color: 'primary.main' }}>
          {rewardBalance !== null ? `${rewardBalance} $KULL` : "Loading..."}
        </Typography>
      </Box>
      <MobileTabNavigation tabs={tabs} position={"top"} />
      <ContractInfo urlBase={`${thirdwebDashboard}/${stakingContractAddress}`} buttonText="Metakul Staking Nft Contract" />
    </Container>
  );
}