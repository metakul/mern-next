import { toEther, toWei, useAddress, useBalance, useContract, useContractRead, useContractWrite, useSDK, useTokenBalance } from "@thirdweb-dev/react";
import styles from "./Style.module.css";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import SwapInput from "./SwapInput";

const kullToken = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as string
const dexAddress = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS as string


const Home: NextPage = () => {
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
  const [contractBalance, setContractBalance] = useState<String>("0");
  const [nativeValue, setNativeValue] = useState<String>("0");
  const [tokenValue, setTokenValue] = useState<String>("0");
  const [currentFrom, setCurrentFrom] = useState<String>("native");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

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
      if(currentFrom === "native") {
        const swapNow=await swapNativeToken({
          overrides: {
            value: toWei(nativeValue as string || "0"),
          }
        });

        alert("Swap executed successfully");
      } else {
        await approveTokenSpending({
          args: [
            DEX_CONTRACT,
            toWei(tokenValue as string || "0"),
          ]
        });
       const swapNow= await swapTokenToNative({
          args: [
            toWei(tokenValue as string || "0")
          ]
        });
        alert("Swap executed successfully");
      }
    } catch (error) {
      alert("An error occurred while trying to execute the swap");
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
    if(!amountToGet) return;
    if(currentFrom === "native") {
      setTokenValue(toEther(amountToGet));
    } else {
      setNativeValue(toEther(amountToGet));
    }
  }, [amountToGet]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div style={{
          backgroundColor: "#111",
          padding: "1rem",
          borderRadius: "10px",
        }}>
          <div 
            >
            <SwapInput
              current={currentFrom as string}
              type="native"
              max={nativeBalance?.displayValue}
              value={nativeValue as string}
              setValue={setNativeValue}
              tokenSymbol="MATIC"
              tokenBalance= {"10"}
            />
            <button
              onClick={() => 
                currentFrom === "native"
                  ? setCurrentFrom("token")
                  : setCurrentFrom("native")
              }
              className={styles.toggleButton}
            >↓</button>
            <SwapInput
              current={currentFrom as string}
              type="token"
              max={tokenBalance?.displayValue}
              value={tokenValue as string}
              setValue={setTokenValue}
              tokenSymbol={symbol as string}
              tokenBalance={tokenBalance?.displayValue}
            />
          </div>
          {address ? (
            <div style={{
            }}>
              <button
                onClick={executeSwap}
                disabled={isLoading as boolean}
                className={`${styles.swapButton} mt-6`}
              >{
                isLoading
                  ? "Loading..."
                  : "Swap"  
              }</button>
            </div>
          ) : (
            <p className="mt-6 text-center">Connect wallet to exchange.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;