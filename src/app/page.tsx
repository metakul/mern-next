import React from 'react';
import { HomePageProps } from '@/Datatypes/interfaces/interface';
import type { Metadata } from "next";

import { Container } from '@mui/material';
import Tab1 from '@/tabs/Tab1';

export default function IndexPage(){

  return (
     <Container className="container">
     <Tab1/>
     </Container>
  );
};

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
