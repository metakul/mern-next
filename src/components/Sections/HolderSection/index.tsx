import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import StorageIcon from '@mui/icons-material/Storage';
import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useContract,
  useAddress,
  useContractWrite,
  useContractRead
} from "@thirdweb-dev/react";
import { toast } from 'react-toastify';
import { ClaimNftInterface } from '@/Datatypes/interfaces/interface';
import { AppDispatch } from '@/lib/store';
import { ClaimNftSlice } from '@/lib/slices/Web3Profile/NftApiSlice';

const nftDropContractAddress = process.env.NEXT_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string

export default function HolderBenifits() {
  const [mintMsg,setMintMsg] = useState("")
  const dispatch = useDispatch()
  const address =useAddress()

  const { contract } = useContract(nftDropContractAddress);

  const { mutateAsync: claim } = useContractWrite(contract, "claim");

  const { data:totalSupply, isLoading } = useContractRead( 
    contract, 
    "totalSupply", 
    [] 
  );
  const handleClaimNft = async () => {
    if(!address){
     toast.error("Wallet Not connected")
      return
    }
    const claimNftHandler: ClaimNftInterface = {
      address,
      claim
    };

    (dispatch as AppDispatch)(ClaimNftSlice({claimNftHandler}));
  }

  return (
    <div className="relative isolate overflow-hidden  px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">EXCLUSIVE </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">NFT HOLDER&apos;S BENIFITS</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                eget aliquam. Quisque id at vitae feugiat egestas.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src="/Images/discordChat.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
          <a href='discord' target='_blank'>
            Join discord to get all benefits
          </a>
          <Container sx={{
            display:"flex",
            justifyContent:"center",
            mb:4
          }}>
              <button onClick={handleClaimNft} className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold  shadow-accent-volume transition-all hover:bg-accent-dark">
                Claim NFT
              </button>

          </Container>
           <Typography variant="h5" className="item-center mt-6 text-center">
            Total Claimed NFT : {isLoading ? "Loading" : parseInt(totalSupply._hex, 16).toString()}/777
           </Typography>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <KeyboardDoubleArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Push to deploy.</strong> Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                    blanditiis ratione.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockPersonIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">SSL certificates.</strong> Anim aute id magna aliqua
                    ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <StorageIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Database backups.</strong> Ac tincidunt sapien
                    vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Not able to claim with your web3 wallet? No problem.</h2>
              <p className="mt-6">
                You can easily get eligibile (whitelist) to claim free nft via our discord giveways or completing simple task.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
