// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './lib/StoreProvider';
import Offline from './PWA/Offline';
// import { WalletAuthProvider } from './contexts/WalletAuthContext';
import { ShowOutletProvider } from './context/showOutletContext';


function App() {
  return (
    <StoreProvider>
      {/* <WalletAuthProvider> */}
      <ShowOutletProvider>
        <Offline>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Offline>
      </ShowOutletProvider>
      {/* </WalletAuthProvider> */}
    </StoreProvider>
  );
}

export default App;