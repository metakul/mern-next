import { Web3Button } from '@thirdweb-dev/react';
import React from 'react';
import { toast } from "react-toastify";

interface Props {
    price: string;
    tokenName: string;
    tokenId: number;
}

const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string

const BuyCrypto: React.FC<Props> = ({ price, tokenName, tokenId }) => {


    const buyTheCrypto = async () => {
        return new Promise<void>((resolve, ) => {
            // Simulate an async operation
            setTimeout(() => {
                // Simulate success
                resolve();
            }, 2000);

        });
    };

    return (
        <div className="p-2">
            <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                    Price
                </span>
            </div>

            <div className="relative mb-2 flex items-center rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                <div className="flex flex-1 items-center self-stretch border-r border-jacarta-100 bg-jacarta-50 px-2">
                    <span>
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            viewBox="0 0 1920 1920"
                            className="mr-1 h-5 w-5"
                        >
                            <path fill="#8A92B2" d="M959.8 80.7L420.1 976.3 959.8 731z"></path>
                            <path fill="#62688F" d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"></path>
                            <path fill="#454A75" d="M959.8 1295.4l539.8-319.1L959.8 731z"></path>
                            <path fill="#8A92B2" d="M420.1 1078.7l539.7 760.6v-441.7z"></path>
                            <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z"></path>
                        </svg>
                    </span>
                    <span className="font-display text-sm text-jacarta-700">{tokenName}</span>
                </div>

                <input
                    type="text"
                    className="h-12 w-full flex-[3] border-0 focus:ring-inset focus:ring-accent"
                    placeholder="Amount"
                    value="0.05"
                    readOnly
                />

                <div className="flex flex-1 justify-end self-stretch border-l border-jacarta-100 bg-jacarta-50">
                    <span className="self-center px-2 text-sm text-jacarta-700">{price}</span>
                </div>
            </div>

            <div className="text-right">
                {/*todo User balance*/}
                <span className="text-sm dark:text-jacarta-400">Balance: 0.0000 WETH</span>
            </div>

            <div className="mt-4 flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="terms"
                    className="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                />
                <label htmlFor="terms" className="text-sm dark:text-jacarta-200">
                    By checking this box, I agree to Metakul&apos;s <a href="#" target='_blank' className="text-accent">Terms of Service</a>
                </label>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-center space-x-4">
                    <Web3Button
                        action={async () => {
                            try {
                                // await contract?.call("withdraw", [[1]]);  // todo remove withdraw
                                await toast.promise(
                                    buyTheCrypto(),
                                    {
                                        pending: "Swapping",
                                        success: "Swap successful!",
                                        error: "Swap failed.",
                                    }
                                );
                            } catch (error) {
                            } 
                        }}
                        contractAddress={nftDropContractAddress}
                    >
                        Swap Now
                    </Web3Button>
                </div>
            </div>
        </div>
    );
};

export default BuyCrypto;
