// App.tsx

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import StoreProvider from './lib/StoreProvider';
import Offline from './PWA/Offline';
// import { WalletAuthProvider } from './contexts/WalletAuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
      {/* <WalletAuthProvider> */}

     <Offline>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </Offline>
      {/* </WalletAuthProvider> */}
    </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;