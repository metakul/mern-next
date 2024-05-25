'use client'
import { useState } from "react";
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

import BreadCrumbs from "@/components/Elements/BreadCrumbs";
import SocialProfiles from "@/components/SocialProfile";
import Link from "next/link";
import { TransferCryptoInterface } from "@/Datatypes/interfaces/interface";
const tokenContractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string

const ShopPage = () => {
  const address = useAddress();

  const { contract } = useContract(tokenContractAddress);
  const {
    mutate: transferTokens,
    isLoading,
    error,
  } = useTransferToken(contract);
  const [to,setAddressTo]=useState("0x9808A1AD4f7DF5992e22F7e21C12819fa98Ee54e")
  const [amount,setAmount]=useState<Number>(20)

  const { mutateAsync: transfer } = useContractWrite(contract, "transfer");

  const handleBuy = async () => {
    if(!address){
      toast.error("Wallet not Connected")
      return
    }

    const transferCryptoHandler: TransferCryptoInterface = {
      to,
      amount,
      transfer
    };

    transferCrypto({transferCryptoHandler})
  }


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
            <Typography variant="h3">
              Buy With your Earned $KULL
            </Typography>
            <SocialProfiles />
          </Box>

          <Button
           onClick={handleBuy}
          >
            Transfer
          </Button>

        </div>
      </Container>

    </Container>

  );
};

export default ShopPage;