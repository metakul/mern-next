

import { Box, Link } from '@mui/material';
import Blogs from './Blogs';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import InstallPWA from '@/PWA/InstallPwa';

const Tab1 = () => {
  return (
    <>
      <h1 className="mb-4 px-auto py-auto text-center font-display text-lg font-medium flex justify-center item-center">
        METAKUL - <Link target="_blank" className="text-blue " href="https://www.erc4337.io/">
          Member of the 4337 Revolution
        </Link>
      </h1>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
          height: '100%',
          padding: '0 1rem',
          margin: '0 auto',
        }}>
      <InstallPWA/>
        </Box>
          <MarqueeCryptoNew />
          <Blogs />
    </>
  );
};

export default Tab1;
