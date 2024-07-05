/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import BannerInfo from './bannerInfo'
import UserCollection from './UserCollection/index'
import { NftTabs } from "@/Datatypes/enums";
import { useAddress } from '@thirdweb-dev/react';
import { Typography } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import StakingTabNavigation from '@/components/MobileTabNav/StakingTab';

export default function profilePage() {
  const [showOutlet, setShowOutlet] = useState<boolean>(false);
  const address = useAddress()

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
      content: <UserCollection type={"metakulNft"} />,
      label: NftTabs.tabTitle2
    },
 
  ];


  return (
    <div>
      {address ? (
        <>
          {/* <BannerInfo /> */}
          <BreadCrumbs currentPath={"/"} />

          <StakingTabNavigation showOutlet={showOutlet} position={"top"} tabs={tabs} />
        </>
      ) : (

        <Typography>
          Wallet Not connected
        </Typography>
      )}

    </div>
  )
}
