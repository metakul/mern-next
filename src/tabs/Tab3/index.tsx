import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';

import CustomDialog from '@/components/Dailog/Dailog';
import BuyCrypto from '../BuyCrypto';
import { getColors } from '@/app/layout/Theme/themes';

import Scrollbar from "@/components/ScrollBar"
import IcoSale from '../ICOSale';
interface Crypto {
  id: number;
  name: string;
  price: string;
  volume: string;
  change: string;
  tradeLink: string;
}

const mockData: Crypto[] = [
  { id: 1, name: 'Bitcoin', price: '$40,000', volume: '$25B', change: '+2.5%', tradeLink: '#' },
  { id: 2, name: 'Ethereum', price: '$2,500', volume: '$15B', change: '-1.2%', tradeLink: '#' },
  { id: 3, name: 'Binance Coin', price: '$300', volume: '$1.5B', change: '+0.8%', tradeLink: '#' },
  { id: 4, name: 'Cardano', price: '$1.50', volume: '$1B', change: '+3.1%', tradeLink: '#' },
  { id: 5, name: 'Dogecoin', price: '$0.35', volume: '$500M', change: '-0.5%', tradeLink: '#' },
];



const CryptoTable: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState<Record<number, boolean>>({});

  const handleDialogToggle = (id: number) => {
    setDialogOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container>
      <Typography variant='h3' sx={{
        alignItems:"center",
        textAlign:"center",
        m:4
      }}>
          Metakul Dex
      </Typography>
      <section
        className="pb-8 pt-8 rounded-lg border border-spacing-1"
        style={{
          background: getColors().blueAccent[800],
        }}
      >
        <Scrollbar>

        <div className=" overflow-x-auto max-h-[36vh]">
          <div className="rounded-lg dark:bg-jacarta-700 dark:text-jacarta-300">
            <div className="flex items-center border-b border-jacarta-100 text-sm dark:border-jacarta-600">
              <div className="hidden w-[6%] pl-4 sm:block lg:pl-10">#</div>
              <div className="w-[36%] px-3 py-5">Name</div>
              <div className="w-[24%] px-3 py-5 text-right lg:w-[16%]">Price</div>
              <div className="hidden w-1/5 px-3 py-5 text-right md:block">Volume (24h)</div>
              <div className="w-[16%] px-3 py-5 text-right lg:w-[12%]">Change (24h)</div>
              <div className="w-[10%] py-5 pl-3 pr-4 text-right">Trade</div>
            </div>
            <div id="js-crypto-prices" className="divide-y divide-jacarta-100 dark:divide-jacarta-600">
              {mockData.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex items-center border-b border-jacarta-100 text-sm dark:border-jacarta-600"
                >
                  <div className="hidden w-[6%] pl-4 sm:block lg:pl-10">{crypto.id}</div>
                  <div className="w-[36%] px-3 py-5">{crypto.name}</div>
                  <div className="w-[24%] px-3 py-5 text-right lg:w-[16%]">{crypto.price}</div>
                  <div className="hidden w-1/5 pBoxx-3 py-5 text-right md:block">{crypto.volume}</div>
                  <div className="w-[16%] px-3 py-5 text-right lg:w-[12%]">{crypto.change}</div>
                  <div className="w-[10%] py-5 pl-3 pr-4 text-right">
                    <CustomDialog
                      open={dialogOpen[crypto.id] || false}
                      triggerButtonText="Buy"
                      onClose={() => handleDialogToggle(crypto.id)}
                      title=""
                      description=""
                    >
                      <BuyCrypto price={crypto.price} tokenName={crypto.name} tokenId={crypto.id} />
                    </CustomDialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Box sx={{
          mt:2,
          display:"flex",
          justifyContent:"center"
        }}>
        Scroll to Load More....</Box>
        </Scrollbar>

      </section>
      <IcoSale/>
    </Container>
  );
};

export default CryptoTable;