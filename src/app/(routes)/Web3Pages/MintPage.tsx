import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  useContract,
  useAddress,
  ThirdwebNftMedia,
  useOwnedNFTs,
  useContractWrite,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { Link, useLocation } from 'react-router-dom';
import { ClaimNftInterface } from "../../interfaces/interface";
import { AppDispatch } from "../../redux/store";
import { ClaimNftSlice } from "../../redux/slices/Web3Profile/NftApiSlice";
import { useDispatch } from "react-redux";
import BreadCrumbs from "../../Components/elements/BreadCrumbs";
import toast from "react-hot-toast";
import SocialProfiles from "../../Components/SocialProfile";

const myNftDropContractAddress = "0x710E9161e8A768c0605335AB632361839f761374"

const MintPage = () => {
  const location = useLocation()
  const address = useAddress();
  const { contract: nftDrop } = useContract(myNftDropContractAddress);
  const [mintMsg,] = useState("")
  const dispatch = useDispatch()

  const { data: ownedNfts } = useOwnedNFTs(nftDrop, address);
  console.log(ownedNfts);

  async function opensea(id: string) {
    const nft = id;
    console.log(`https://www.opensea.io/${myNftDropContractAddress}/${nft}`);
    window.open(
      `https://opensea.io/assets/matic/${myNftDropContractAddress}/${nft}`
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { contract } = useContract(myNftDropContractAddress);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutateAsync: claim } = useContractWrite(contract, "claim");

  const claimNftHandler: ClaimNftInterface = {
    address,
    claim
  };
  const handleClaimNft = async () => {
    if(!address){
      toast.error("Wallet not Connected")
      return
    }
    (dispatch as AppDispatch)(ClaimNftSlice(claimNftHandler));
  }

  return (
    <Container >
      <Container>
        <BreadCrumbs currentPath={location.pathname} />
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

          <Container>
              <button onClick={handleClaimNft} className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold  shadow-accent-volume transition-all hover:bg-accent-dark">
                Claim NFT
              </button>
            {mintMsg && <p>{mintMsg}</p>}
          </Container>
          <Container className="mt-4">
            <Link to="/earn">
              <button className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold  shadow-accent-volume transition-all hover:bg-accent-dark"
              > Already Claimed? Stake Now</button>
            </Link>
          </Container>
         
        </div>
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
            {ownedNfts?.map((nft) => (
              <Box>
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
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>

    </Container>

  );
};

export default MintPage;