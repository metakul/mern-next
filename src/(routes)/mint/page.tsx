
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
  // const { data: ownedNfts } = useOwnedNFTs(nftDrop, address);



  return (
      <Container sx={{
        mt:12
      }}>
        <BreadCrumbs currentPath={"/mint"}/>
       
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
                <h2>Your Owned NFT</h2>
                View it On Profile
              </div>
            }
          </Grid>
         
        </Grid>
      <ContractInfo urlBase={`${thirdwebDashboard}/${nftDropContractAddress}`} buttonText="Metakul Nft Contract" />

      </Container>


  );
};

export default MintPage;