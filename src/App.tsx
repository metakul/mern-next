// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './lib/StoreProvider';
// import { WalletAuthProvider } from './contexts/WalletAuthContext';


function App() {
  return (
   <StoreProvider>
      {/* <WalletAuthProvider> */}

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      {/* </WalletAuthProvider> */}
    </StoreProvider>
  );
}

export default App;