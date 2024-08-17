'use client'
import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  useContract,
  useAddress,
  ThirdwebNftMedia,
  useOwnedNFTs,
  useContractWrite,
  ConnectWallet,
  useContractRead
} from "@thirdweb-dev/react";
import {  toast, ToastContainer } from 'react-toastify';
import { readContract } from "thirdweb";


import { ClaimNftInterface } from "@/Datatypes/interfaces/interface";
import { AppDispatch } from "@/lib/store";
import { ClaimNftSlice } from "@/lib/slices/Web3Profile/NftApiSlice";
import { useDispatch } from "react-redux";
import BreadCrumbs from "@/components/Elements/BreadCrumbs";
import SocialProfiles from "@/components/SocialProfile";
import Link from "next/link";


const nftDropContractAddress = process.env.NEXT_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string

const MintPage = () => {
  const address = useAddress();
  const { contract: nftDrop } = useContract(nftDropContractAddress);
  const [mintMsg,setMintMsg] = useState("")
  const dispatch = useDispatch()
  const [errmsg, setErrmsg]=useState("")
  const { data: ownedNfts } = useOwnedNFTs(nftDrop, address);

  async function opensea(id: string) {
    const nft = id;
    // window.open(
    //   `https://opensea.io/assets/matic/${nftDropContractAddress}/${nft}`
    // );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { contract } = useContract(nftDropContractAddress);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutateAsync: claim } = useContractWrite(contract, "claim");

  const { data:totalSupply, isLoading } = useContractRead( 
    contract, 
    "totalSupply", 
    [] 
  );
  const handleClaimNft = async () => {
    if(!address){
     toast.error("Wallet Not connected")
      return
    }
    const claimNftHandler: ClaimNftInterface = {
      address,
      claim
    };

    (dispatch as AppDispatch)(ClaimNftSlice({claimNftHandler}));
  }


  return (
    <Container >
      <Container>
        <BreadCrumbs currentPath={"/mint"} />
        <div className="">
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={6} sx={{
              mb: 4
            }}>
              <Typography variant="h3">
                GASLESS NFT Mint
              </Typography>
            </Grid>
            <Grid item xs={6} className="flex justify-end">
              <Box>

              <ConnectWallet className="max-h-[220px]" />
              </Box>
            </Grid>
            <Grid xs={12} sx={{
              display: "flex",
              justifyContent: "center",
              maxHeight:"450px"
            }}>
             <SocialProfiles/>
          </Grid>
            <Grid xs={12} sx={{
              my: 4,
              display: "flex",
              justifyContent: "center",
              maxHeight:"450px"
            }}>
              <video className="border-2 rounded-2xl" controls>
                <source src="video/MetakulInfo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Grid>
          </Grid>

          <Container sx={{
            display:"flex",
            justifyContent:"center",
            mb:4
          }}>
              <button onClick={handleClaimNft} className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold  shadow-accent-volume transition-all hover:bg-accent-dark">
                Claim NFT
              </button>

          </Container>
           <Typography variant="h5" className="item-center mt-6 text-center">
            Total Claimed NFT : {isLoading ? "Loading" : parseInt(totalSupply._hex, 16).toString()}
           </Typography>
         
        </div>
        <Box sx={{
          display:"flex",
          justifyContent:'center',
          mt:4,
        }}>
              {mintMsg && <p>{mintMsg}</p>}
              {errmsg && !mintMsg && <p>{errmsg}</p>}

        </Box>

        <Grid container className="flex items-center justify-center mt-16">
          <Grid>
            {address &&
              <div>
                <h3>Your Owned NFT</h3>
                <p style={{ marginTop: "0px", fontWeight: "bold" }}>
                  ( Will Load After Mint )
                </p>
              </div>
            }
          </Grid>
          <Grid>
            {ownedNfts?.map((nft,index) => (
              <Container key={index}>
                <div
                  key={nft.metadata.id.toString()}
                  className=""
                >
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className="nftMedia"
                  />
                  <h3
                  >
                    {nft.metadata.name}
                  </h3>
                  <Button
                    onClick={() => opensea(nft.metadata.id)}
                    className="mainButton"
                  >
                    View on Opensea
                  </Button>
                </div>
              </Container>
            ))}
          </Grid>
        </Grid>
      </Container>

    </Container>

  );
};

export default MintPage;