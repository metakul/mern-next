import {
  useContract,
  useNFT,
  // useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import { toast } from 'react-toastify';

const stakingContractAddress = import.meta.env.VITE_PUBLIC_STAKING_CONTRACT_ADDRESS as string
const nftDropContractAddress = import.meta.env.VITE_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string

const SingleNftCard = ({ tokenId }: any) => {
  const { contract } = useContract(nftDropContractAddress, "nft-drop");
  const { data: nft } = useNFT(contract, tokenId);
  // const address = useAddress()

  return (
    <>
      {nft && (
        <article>
          <div className="block ml-2 rounded-2.5xl border border-jacarta-100 p-[1\5rem] transition-shadow hover:shadow-lg">
            <figure className="relative">
              {nft.metadata.image &&
                <>
                  <img
                    src={nft.metadata.image}
                    alt={`item ${nft?.metadata?.name}`}
                    className="w-full rounded-t-2.5xl border "
                    loading="lazy"
                  />
                </>
              }
              <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md  p-2">
                <span
                  className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4  before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                  data-tippy-content="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 hover:fill-red"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path
                      d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                    />
                  </svg>
                </span>
                <span className="text-sm"></span>
              </div>
            </figure>
            <div className="mt-4 ml-4 flex items-center justify-between">
              <span className="font-display text-base hover:text-accent">{nft?.metadata?.name}</span>
            </div>
            <div className="mt-4 flex items-center justify-between ml-4">

              <Web3Button
                style={{
                  width: "100%",
                  maxWidth: "50px",
                  marginBottom: "16px",
                  boxSizing: "border-box",
                }}
                action={async (contract) => {
                  try {
                    await toast.promise(
                      contract?.call("withdraw", [[nft.metadata.id]]), {
                      pending: "Withdrawing Now",
                      success: "Withdraw successful!",
                      error: "'Withdraw failed.",
                    }
                    );


                  } catch (error) {
                    toast.error('Withdraw failed.');
                  }
                }}
                contractAddress={stakingContractAddress}
              >
                Withdraw
              </Web3Button>

            </div>
          </div>

        </article>

      )}
    </>
  );
};
export default SingleNftCard;
