"use client"
import React, { useEffect } from 'react';
import { HomePageProps } from '@/Datatypes/interfaces/interface';

import { Container } from '@mui/material';
import Tab1 from '@/tabs/Tab1';
import { useSelector } from 'react-redux';
import { isAuthenticated, selectUserType, } from '@/lib/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Pages, UserCategory } from '@/Datatypes/enums';
import { Helmet } from 'react-helmet';




const HomePage: React.FC<HomePageProps> = () => {

  const isUserAuthenticated = useSelector(isAuthenticated);
  const userType = useSelector(selectUserType);
  const navigation = useNavigate()


  useEffect(() => {
    if (isUserAuthenticated && userType == UserCategory.SUPER_ADMIN) {
      navigation(Pages.DASHBOARD)
    } else {
      console.error("User is not authenticated");
    }
  }, [isUserAuthenticated]);

  return (
    <Container className="container">

      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Metakul- A next gen education platform in Blockchain." />
        <meta name="keywords" content="metakul, web3, blockchain, quantum" />
        <meta property="og:title" content="Metakul" />
        <meta property="og:description" content="Metakul- A next gen education platform in Blockchain." />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="description"
          content="Metakul- A next gen education platform in Blockchain."
          data-react-helmet="true"
        />

        <meta
          property="og:url"
          content="https://metakul.live/"
          data-react-helmet="true"
        />
          <meta
            property="og:image"
            content="https://c3ihub.org/assets/images/png/gallery/7-c24.png"
            data-react-helmet="true"
          />
          <meta
            name="twitter:card"
            content="summary"
            data-react-helmet="true"
          />


            <title>Metakul</title>
            <meta name="description" content="Discover a gasless blockchain platform with NFTs, offering seamless transactions and passive crypto income through innovative staking and digital asset ownership." />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="metakul" />
            <meta property="og:description" content="Discover a gasless blockchain platform with NFTs, offering seamless transactions and passive crypto income through innovative staking and digital asset ownership." />

            <meta property="og:url" content="https://metakul.live/" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="metakul" />
            <meta name="twitter:description" content="Discover a gasless blockchain platform with NFTs, offering seamless transactions and passive crypto income through innovative staking and digital asset ownership." />
          </Helmet>

          <Tab1 />
        </Container>
        );
};

        export default HomePage;