
import {  Button, Container, Grid } from "@mui/material";
import {
  useAddress,
  useContract,
  ThirdwebNftMedia,
  useOwnedNFTs,
} from "@thirdweb-dev/react";


import BreadCrumbs from "@/components/Elements/BreadCrumbs";
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