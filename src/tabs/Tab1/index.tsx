import { Box } from '@mui/material';
import Blogs from './Blogs';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import InstallPWA from '@/PWA/InstallPwa';
import { getColors } from '@/layout/Theme/themes';
import LaunchIcon from '@mui/icons-material/Launch';
const Tab1 = () => {
  const handleLinkClick = () => {
    window.open('https://www.erc4337.io/', '_blank'); // Opens the link in a new tab
  };

  return (
    <>
      <h1 className="mb-4 underline underline-offset-4 text-center  font-display text-xl open-sans flex justify-center items-center" onClick={handleLinkClick} style={{ cursor: 'pointer' }}>
        <span style={{ color: getColors().blueAccent[100], textDecoration: 'none' }}>
          METAKUL - Member of the 4337 Revolution <LaunchIcon/>
        </span>
      </h1>


      <Box sx={{
        display: 'flex',
        justifyContent: 'end',
        width: '100%',
        height: '100%',
        padding: '0 1rem',
        margin: '0 auto',
      }}>
        <InstallPWA />
      </Box>
      
      <MarqueeCryptoNew />
      <Blogs />
    </>
  );
};

export default Tab1;
