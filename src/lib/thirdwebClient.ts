import { createThirdwebClient } from "thirdweb";

const clientId = import.meta.env.VITE_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = import.meta.env.VITE_PUBLIC_SECRET_KEY;

if (!clientId) {
  throw new Error("Client ID not set");
}

export default createThirdwebClient(secretKey ? { secretKey } : { clientId });