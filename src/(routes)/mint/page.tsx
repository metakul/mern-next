
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  useAddress,
  useContract,
  ThirdwebNftMedia,
  useOwnedNFTs,
  ConnectWallet,
} from "@thirdweb-dev/react";


import BreadCrumbs from "@/components/Elements/BreadCrumbs";
import SocialProfiles from "@/components/SocialProfile";
import HolderBenifits from "@/components/Sections/HolderSection";
import ContractInfo from "@/components/ContractInfo/ContractInfo";


const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string
const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string

const MintPage = () => {
  const { contract: nftDrop } = useContract(nftDropContractAddress);
  const address=useAddress()
  // const [errmsg, setErrmsg]=useState("")
  const { data: ownedNfts } = useOwnedNFTs(nftDrop, address);

  async function opensea(id: string) {
    const nft = id;
    window.open(
      `https://opensea.io/assets/matic/${nftDropContractAddress}/${nft}`
    );
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

      
         
        </div>
        {/* <Box sx={{
          display:"flex",
          justifyContent:'center',
          mt:4,
        }}>
              {mintMsg && <p>{mintMsg}</p>}
              {errmsg && !mintMsg && <p>{errmsg}</p>}

        </Box> */}
        <HolderBenifits/>

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
      <ContractInfo urlBase={`${thirdwebDashboard}/${nftDropContractAddress}`} buttonText="Metakul Nft Contract" />

      </Container>

    </Container>

  );
};

export default MintPage;