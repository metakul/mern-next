import { Box, Typography } from '@mui/material';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import InstallPWA from '@/PWA/InstallPwa';
import { getColors } from '@/layout/Theme/themes';
import DropShipItems from './DropShipItems';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const Tab1 = () => {
  return (
    <>
      <h1 className="mb-4 pt-2 pb-2 underline underline-offset-4 text-center  font-display text-xl open-sans flex justify-center items-center"  style={{ color: getColors().blueAccent[100], cursor:"pointer" }}>
          Meta-Ship   <LocalShippingIcon sx={{
            ml:1
          }}/>
      </h1>
      <MarqueeCryptoNew />
      <Box sx={{
      }}>
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Featured Items
        </Typography>
        <DropShipItems />
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Most Liked Shirt
        </Typography>
        <DropShipItems categoryType="shirt" />
        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Hot Deals
        </Typography>
        <DropShipItems categoryType="hotdeals" />
      </Box>
        <InstallPWA />
    </>
  );
};

export default Tab1;
