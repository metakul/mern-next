import { ConnectWallet, toEther, toWei, useAddress, useBalance, useContract, useContractRead, useContractWrite, useSDK, useTokenBalance } from "@thirdweb-dev/react";
import styles from "./Style.module.css";
import { useEffect, useState } from "react";
import SwapInput from "./SwapInput";
import { Box, Typography } from "@mui/material";
import { getColors } from "@/layout/Theme/themes";
import { toast } from "react-toastify";

const kullToken = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string
const dexAddress = import.meta.env.VITE_PUBLIC_DEX_CONTRACT_ADDRESS as string


const Home = () => {
  // Contracts for the DEX and the token
  const TOKEN_CONTRACT = kullToken;
  const DEX_CONTRACT = dexAddress;

  // SDK instance
  const sdk = useSDK();

  // Get the address of the connected account
  const address = useAddress();
  // Get contract instance for the token and the DEX
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT);
  const { contract: dexContract } = useContract(DEX_CONTRACT);
  // Get token symbol and balance
  const { data: symbol } = useContractRead(tokenContract, "symbol");
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  // Get native balance and LP token balance
  const { data: nativeBalance } = useBalance();
  const { data: contractTokenBalance } = useTokenBalance(tokenContract, DEX_CONTRACT);

  // State for the contract balance and the values to swap
  const [contractBalance, setContractBalance] = useState<string>("0");
  const [nativeValue, setNativeValue] = useState<string>("0");
  const [tokenValue, setTokenValue] = useState<string>("0");
  const [currentFrom, setCurrentFrom] = useState<string>("native");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutateAsync: swapNativeToken } = useContractWrite(
    dexContract,
    "swapEthTotoken"
  );
  const { mutateAsync: swapTokenToNative } = useContractWrite(
    dexContract,
    "swapTokenToEth"
  );
  const { mutateAsync: approveTokenSpending } = useContractWrite(
    tokenContract,
    "approve"
  );

  // Get the amount of tokens to get based on the value to swap
  const { data: amountToGet } = useContractRead(
    dexContract,
    "getAmountOfTokens",
    currentFrom === "native"
      ? [
        toWei(nativeValue as string || "0"),
        toWei(contractBalance as string || "0"),
        contractTokenBalance?.value,
      ]
      : [
        toWei(tokenValue as string || "0"),
        contractTokenBalance?.value,
        toWei(contractBalance as string || "0"),
      ]
  );

  // Fetch the contract balance
  const fetchContractBalance = async () => {
    try {
      const balance = await sdk?.getBalance(DEX_CONTRACT);
      setContractBalance(balance?.displayValue || "0");
    } catch (error) {
    }
  };

  // Execute the swap
  // This function will swap the token to native or the native to the token
  const executeSwap = async () => {
    setIsLoading(true);
    try {
      if (currentFrom === "native") {

        if (nativeBalance && nativeBalance?.displayValue > nativeValue ) {
          await swapNativeToken({
            overrides: {
              value: toWei(nativeValue as string || "0"),
            }
          });
          toast.success("Swap executed successfully");
        }
        else{
          toast.error("Not enough Balance")
        }

      } else {
        await approveTokenSpending({
          args: [
            DEX_CONTRACT,
            toWei(tokenValue as string || "0"),
          ]
        });
        await swapTokenToNative({
          args: [
            toWei(tokenValue as string || "0")
          ]
        });
        toast.success("Swap executed successfully");
      }
    } catch (error) {
      toast.error("An error occurred while trying to execute the swap");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the contract balance and update it every 10 seconds
  useEffect(() => {
    fetchContractBalance();
    setInterval(fetchContractBalance, 10000);
  }, []);

  // Update the amount to get based on the value
  useEffect(() => {
    if (!amountToGet) return;
    if (currentFrom === "native") {
      setTokenValue(toEther(amountToGet));
    } else {
      setNativeValue(toEther(amountToGet));
    }
  }, [amountToGet]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{
          backgroundColor: getColors().secondary[900],
          padding: "1rem",
          borderRadius: "10px",
        }}>
          <Box sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexDirection: "column",
          }}
          >
            <SwapInput
              current={currentFrom as string}
              type="native"
              max={nativeBalance?.displayValue}
              value={nativeValue as string}
              setValue={setNativeValue}
              tokenSymbol="MATIC"
              cryptoSign="POL"
              tokenBalance={nativeBalance?.displayValue}
            />
            <button
              onClick={() =>
                currentFrom === "native"
                  ? setCurrentFrom("token")
                  : setCurrentFrom("native")
              }
              className="button"
            >↓</button>
            <SwapInput
              current={currentFrom as string}
              type="token"
              max={tokenBalance?.displayValue}
              value={tokenValue as string}
              setValue={setTokenValue}
              tokenSymbol={symbol as string}
              cryptoSign={symbol as string}
              tokenBalance={tokenBalance?.displayValue}
            />
          </Box>
          {address ? (
            <div style={{
            }}>
              <button
                onClick={executeSwap}
                disabled={isLoading || nativeValue == "0" || tokenValue == "0" || nativeValue == "" || tokenValue == ""}
                className={`${styles.swapButton} mt-6`}
              >
                {isLoading ? "Swapping..." : "Swap"}
              </button>
            </div>
          ) : (
            <ConnectWallet />
          )}

          <Box >

            <br />
            <Typography>

              Total Liquidity Added : {contractBalance} $POL
            </Typography>
            <br />
            <Typography>
              Total Token Remaining : {contractTokenBalance ? contractTokenBalance?.displayValue?.toString() : "Loading"} $KULL
            </Typography>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default Home;