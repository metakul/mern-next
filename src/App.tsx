// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './lib/StoreProvider';
import Offline from './PWA/Offline';
// import { WalletAuthProvider } from './contexts/WalletAuthContext';
//provider:
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  // localWallet,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";


const smartWalletOptions = {
  factoryAddress: "0x2ace847964fe70d38ea6dad726e3a230dca244bd",
  gasless: true,
};

const clientId = import.meta.env.VITE_PUBLIC_THIRDWEB_CLIENT_ID;


function App() {

  return (
    <ThirdwebProvider
    activeChain="polygon"
    clientId={clientId}
    supportedWallets={[
      smartWallet(metamaskWallet(), smartWalletOptions),
      smartWallet(
        coinbaseWallet({ recommended: true }),
        smartWalletOptions
      ),
      smartWallet(walletConnect(), smartWalletOptions),
      // smartWallet(localWallet(), smartWalletOptions),
      smartWallet(
        embeddedWallet({
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
              "email",
              "phone",
            ],
          },
        }),
        smartWalletOptions
      ),
    ]}
  >
    <StoreProvider>
      {/* <WalletAuthProvider> */}

     <Offline>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </Offline>
      {/* </WalletAuthProvider> */}
    </StoreProvider>
    </ThirdwebProvider>

  );
}

export default App;