
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
    if (isUserAuthenticated && userType == UserCategory.ROADIES_SUPER_ADMIN) { // todo use SUPER_ADMIN_DROP_SHIP
      navigation(Pages.DASHBOARD)
    } else {
      console.error("User is not authenticated");
    }
  }, [isUserAuthenticated]);

  return (
    <Container sx={{
      padding: { xs: 0 },
      margin: { xs: 0 }
    }}>

      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Discover the best online shopping experience with meta-shippers." />
        <meta name="keywords" content="metakul, web3, blockchain, quantum" />
        <meta property="og:title" content="Meta-Ship" />
        <meta property="og:description" content="Discover the best online shopping experience with meta-shippers." />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="description"
          content="Discover the best online shopping experience with meta-shippers."
          data-react-helmet="true"
        />

        <meta
          property="og:url"
          content="https://metashippers.com/"
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


            <title>Meta-Ship</title>
            <meta name="description" content="Discover the best online shopping experience with meta-shippers." />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="metashippers" />
            <meta property="og:description" content="Discover the best online shopping experience with meta-shippers." />

            <meta property="og:url" content="https://metashippers.com/" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="metashippers" />
            <meta name="twitter:description" content="Discover the best online shopping experience with meta-shippers." />
          </Helmet>

          <Tab1 />
        </Container>
        );
};

        export default HomePage;