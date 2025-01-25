// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './lib/StoreProvider';
import Offline from './PWA/Offline';
// import { WalletAuthProvider } from './contexts/WalletAuthContext';


function App() {
  return (
    <StoreProvider>
      {/* <WalletAuthProvider> */}

     <Offline>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </Offline>
      {/* </WalletAuthProvider> */}
    </StoreProvider>
  );
}

export default App;