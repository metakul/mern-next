
import ContractInfo from '@/components/ContractInfo/ContractInfo';
import Staking from './Staking';
import UnStaking from './UnStaking';
import MobileTabNavigation from "@/components/MobileTabNav/StakingTab";

import { Container, Typography } from '@mui/material';
const tabs = [
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>Stake</Typography>, content: <Staking/>, label: "Stake Now" },
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>UnStake</Typography>, content: <UnStaking/>, label: "UnStake Now" },

];
const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string
const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string

export default function EarnPage() {


  return (
    <Container >
   <MobileTabNavigation  tabs={tabs} position={"top"}/>
   <ContractInfo urlBase={`${thirdwebDashboard}/${stakingContractAddress}`} buttonText="Metakul Staking Nft Contract" />

    </Container>
  );
}