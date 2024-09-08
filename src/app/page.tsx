"use client"
import React, { useEffect } from 'react';
import Blogs from '@/tabs/Tab1/Blogs';

import { Container } from '@mui/material';
import Tab1 from '@/tabs/Tab1';
import { useSelector } from 'react-redux';
import { isAuthenticated, } from '@/lib/slices/authSlice';
import AdminHomePage from './(routes)/admin/home/page';
import { useRouter } from 'next/navigation';
// import PWA_MANAGER from '@/PWA/Installprompt';
import InstallPWA from '@/PWA/InstallPWA';
import Offline from '@/PWA/offline';
import Head from 'next/head';




const HomePage = () => {

  const isUserAuthenticated = useSelector(isAuthenticated);
  const router = useRouter()


  useEffect(() => {
    if (isUserAuthenticated) {
      router.push('/admin/home')
    } else {
      console.error("User is not authenticated");
    }
  }, [isUserAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Metakul Home Page" />
      </Head>
      <Container>
        <Container className="container">
          <Offline>

            {/* <PWA_MANAGER/> */}
            <InstallPWA />
            <Tab1 />
          </Offline>
        </Container>
      </Container>
    </>
  );
};

export default HomePage;
