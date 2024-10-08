
import Staking from './Staking';
import UnStaking from './UnStaking';
import MobileTabNavigation from "@/components/MobileTabNav/StakingTab";

import { Container, Typography } from '@mui/material';
const tabs = [
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>Stake</Typography>, content: <Staking/>, label: "Stake Now" },
  { value: <Typography variant='h5' className='font-display text-base hover:text-accent'>UnStake</Typography>, content: <UnStaking/>, label: "UnStake Now" },

];

export default function EarnPage() {


  return (
    <Container >
   <MobileTabNavigation  tabs={tabs} position={"top"}/>

    </Container>
  );
}