'use client'
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  useContract,
  useAddress,
  useTransferToken,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { toast, ToastContainer } from 'react-toastify';
import { transferCrypto } from "@/lib/helpers";
import { ethers } from "ethers";

import BreadCrumbs from "@/components/Elements/BreadCrumbs";
import SocialProfiles from "@/components/SocialProfile";
import Link from "next/link";
import { TransferCryptoInterface } from "@/Datatypes/interfaces/interface";
import CustomSwiper from "@/components/Swiper";

const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string

const ShopPage = () => {
  const address = useAddress();

  const { contract } = useContract(tokenContractAddress);
  const [balance, setBalance] = useState<string>()
  const [to, setAddressTo] = useState("0x9808A1AD4f7DF5992e22F7e21C12819fa98Ee54e")
  const [amount, setAmount] = useState<Number>(20)

  const { mutateAsync: transfer } = useContractWrite(contract, "transfer");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && contract) {

          const userBalance = await contract?.erc20.balance();

          console.log(userBalance.displayValue);
          setBalance(userBalance?.displayValue);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Check if address is not null before fetching balance
    if (address !== null && contract) {
      fetchBalance();
    }

  }, [address, contract]);

  const handleBuy = async () => {
    if (!address) {
      toast.error("Wallet not Connected")
      return
    }

    const transferCryptoHandler: TransferCryptoInterface = {
      to,
      amount,
      transfer
    };

    transferCrypto({ transferCryptoHandler })
  }
  const hotStarImages: string[] = [
    '/Shop/hotstar/1.png',
    '/Shop/hotstar/2.webp',
  ];
  const images: string[] = [
    '/Shop/sonyliv/1.jpg',
    '/Shop/sonyliv/2.jpg',
    '/Shop/sonyliv/3.jpg',
  ];
  const linkedin: string[] = [
    '/Shop/linkedin/1.jpg',
    '/Shop/linkedin/2.jpg',
    '/Shop/linkedin/3.png',
  ];

  return (
    <Container >
      <Container>
        <BreadCrumbs currentPath={"/mint"} />
        <div className="">
          <Box sx={{
            mb: 4,
            fidplsy: "flex",
            flexDirection: "row"
          }}>
            <Grid >
              <Grid xs={8}>
                <Typography variant="h3">
                  Buy With your Earned $KULL
                </Typography>
              </Grid>
              <Grid item xs={4}>
                  <Typography className="mt-4" >
                    Remaining Balance: <b>
                      {balance}
                      {/* {ethers.utils.formatUnits(balance, 18)} */}
                    </b>{" "}
                    $KULL
                  </Typography>
              </Grid >

            </Grid>
            <SocialProfiles />
          </Box>



        <Box>
          <CustomSwiper images={hotStarImages} autoplayDelay={3000}/>
          <CustomSwiper images={images} autoplayDelay={3000}/>
          <CustomSwiper images={linkedin} autoplayDelay={3000}/>
          <Button
            onClick={handleBuy}
          >
            Transfer
          </Button>

        </Box>

        </div>
      </Container>

    </Container>

  );
};

export default ShopPage;