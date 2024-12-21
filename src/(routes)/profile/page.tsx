/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react'
// import BannerInfo from './bannerInfo'
import UserCollection from './UserCollection/index'
import CreatedNft from './UserCollection/index'
import { NftTabs } from "@/Datatypes/enums";
import { ConnectWallet, useAddress, useContract } from '@thirdweb-dev/react';
import { Box, Card, Container, Typography } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import StakingTabNavigation from '@/components/MobileTabNav/StakingTab';
import SocialProfiles from '@/components/SocialProfile';
import ContractInfo from '@/components/ContractInfo/ContractInfo';
import copy from "clipboard-copy";
import { toast } from 'react-toastify';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string
const nftMinterAddress = import.meta.env.VITE_PUBLIC_NFT_MINTER_CONTRACT as string
const tokenContractAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string
const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string

export default function ProfilePage() {
  const [showOutlet/*, setShowOutlet*/] = useState<boolean>(false);
  const address = useAddress()
  const { contract:tokenContract } = useContract(tokenContractAddress);
  const [balance, setBalance] = useState<string>("Loading...")
  const [isIconClicked, setIsIconClicked] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && tokenContract) {

          const userBalance = await tokenContract?.erc20.balance();

          setBalance(userBalance?.displayValue);
        }
        else {
          setBalance("Connect Wallet to view balance")
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (address !== null && tokenContract) {
      fetchBalance();
    }

  }, [address, tokenContract]);
  
  const tabs = [

    {
      value: <button
        className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
        id="owned-tab"
        data-bs-toggle="tab"
        data-bs-target="#owned"
        type="button"
        role="tab"
        aria-controls="owned"
        aria-selected="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="mr-1 h-5 w-5 fill-current">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm9 8h3l-4 4-4-4h3V9h2v4z"
          />
        </svg>
        <span className="font-display text-base font-medium">Owned</span>
      </button>,
      content: <UserCollection collectionAddress={nftDropContractAddress} type={"metakulNft"} />,
      label: NftTabs.tabTitle2
    },
    {
      value: <button
        className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
        id="owned-tab"
        data-bs-toggle="tab"
        data-bs-target="#owned"
        type="button"
        role="tab"
        aria-controls="owned"
        aria-selected="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="mr-1 h-5 w-5 fill-current">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm9 8h3l-4 4-4-4h3V9h2v4z"
          />
        </svg>
        <span className="font-display text-base font-medium">Created</span>
      </button>,
      content: <CreatedNft collectionAddress={nftMinterAddress} type={"ownerCreatedNft"} />,
      label: NftTabs.tabTitle2
    },
  ];


  const handleCopySmartWalletAddress = () => {
    if (address) {
      setIsIconClicked(true);

      copy(address)
        .then(() => {
          toast.success("Copied");
        })
        .catch(() => {
          toast.error("Copy failed");
        });
      setIsIconClicked(false);
    }
  };

  const iconClickedStyle = {
    transform: isIconClicked ? 'scale(0.8)' : 'scale(1)',
    transition: 'transform 0.3s',
    ml: 2
  };

  return (
    <Container sx={{
    }}>
      {/* <BannerInfo /> */}
      <BreadCrumbs currentPath={"/profile"} />
      <Card sx={{
        p: 4,
        mt: 2
      }}>
        <Box sx={{
          width: '100%',
          height: '100%',
          padding: '0 1rem',
          margin: '0 auto',
        }}>
          <Typography
            className='text-center mt-4 mb-4'
            variant="h4"
            color="textSecondary"
          >
            {address && address.slice(0, 3) + "..." + address.slice(-4)}
            <ContentCopyOutlinedIcon
              onClick={handleCopySmartWalletAddress}
              sx={iconClickedStyle}
            />
          </Typography>

          {balance &&
            <Typography variant="h4" sx={{
              p:1
            }} className="text-center mt-4 mb-4">
              {parseFloat(balance).toFixed(4)} $KULL
            </Typography>
          }
          <Typography variant="h5" sx={{ mt: 2 }} className="text-center mt-8 mb-4">
            Know More and Earn :
          </Typography>
          <SocialProfiles />
          <ContractInfo urlBase={`${thirdwebDashboard}/${tokenContractAddress}`} buttonText="ERC20 Contract" />
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '0 1rem',
          margin: '0 auto',
        }}>
          <Typography variant="h3" className=" mt-4 mb-4">
            My NFTs
          </Typography>
          <ConnectWallet />
        </Box>
        <StakingTabNavigation showOutlet={showOutlet} position={"top"} tabs={tabs} />
      </Card>
    </Container>
  )
}