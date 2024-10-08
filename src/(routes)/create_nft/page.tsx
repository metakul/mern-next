
import { Container, Grid, Typography, Box } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import MintForm from "./MintFormHelpers/MintForm"

 const CreateNft = () => {
    return (
        <Container>
         
            <Container sx={{
                mb: 4,
            }}>
                <BreadCrumbs currentPath={"/create_nft"}/>
                <Box sx={{mt:4}} >
                    <Typography variant="h4" >Create Your own NFT Now</Typography>
                    <Typography variant="body2">We&apos;re always happy to onboard new talent in the web3 space!</Typography>
                </Box>
                <Grid container spacing={2}>
                <MintForm/>
                </Grid>
            </Container>
          
        </Container>
    );
};
export default CreateNft;