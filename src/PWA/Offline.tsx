import { useEffect, useState, useRef } from 'react';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Typography, Box, Slide, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import { ReactNode } from 'react';
import { CloseFullscreen } from '@mui/icons-material';
import {Button} from '@mui/material';

interface OfflineProps {
    children: ReactNode;
  }
// Custom hook for previous value
function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);
  
    useEffect(() => {
      ref.current = value;
    }, [value]);
  
    return ref.current;
  }

const OfflineContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
//   backgroundColor: theme.palette.colors.colors.grey[800],
  padding: theme.spacing(2),
}));

const OfflineContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const OfflineOverlay = styled(Backdrop)(() => ({
  zIndex: 1299,
  backgroundColor: "#F58634",
  height:"300px"
}));

export default function Offline({ children }:OfflineProps) {
  const [online, setOnline] = useState(navigator.onLine);
  const previousOnline = usePrevious(online);

//   useEffect(() => {
//     if (!online) {
//       disableBodyScroll(document.body);
//     } else {
//       enableBodyScroll(document.body);
//     }
//   }, [online]);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

    const closeOpenOfflineDailog=()=>{
      setOnline(true)
    }
  return (
    <>
      <Slide direction={online ? 'up' : 'down'} in={!online} mountOnEnter unmountOnExit>
        <OfflineContainer style={previousOnline === online && online ? { display: 'none' } : undefined}>
          <OfflineContent>
          <img src="logo.svg" alt="metakul" height={100} width={100} />
            <Typography variant="h3" gutterBottom>
              You're Offlines
            </Typography>
            <Typography variant="body1">
              Check your internet connection.
            </Typography>
          <Button onClick={closeOpenOfflineDailog}>
            Close <CloseFullscreen/>
          </Button>
          </OfflineContent>
        </OfflineContainer>
      </Slide>
      <OfflineOverlay open={!online} />
      {children}
    </>
  );
}