import { useDispatch, useSelector } from 'react-redux';
import { selectNftCollection } from '@/lib/slices/MetakulCollection/NftSlice';
import { AppDispatch } from '@/lib/store';
import { LoadNftSlice } from '@/lib/slices/MetakulCollection/NftApiSlice';
import { CollectionInfo } from '@/Datatypes/interfaces/interface';
import { Button, Container } from '@mui/material';
import { BalanceItem } from '@/Datatypes/interfaces/interface';
import { ConnectWallet } from '@thirdweb-dev/react';
import NftCard from '@/components/Cards/NftCard';
import CustomDialog from '@/components/Dailog/Dailog';
import LoginForm from '@/components/Forms/LoginForm';
import { useState } from 'react';
import SocialProfiles from '@/components/SocialProfile';

export const svgStyle = {
  fill: '#5893f9', // Set your desired fill color here
  height: '1em',
};
const MetakulCollection = () => {
  const dispatch = useDispatch()
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const balance = useSelector(selectNftCollection).nfts as BalanceItem[]

  const handleLoadNft = () => {
    const collectionInfo: CollectionInfo = {
      collectionAddress: "0x710E9161e8A768c0605335AB632361839f761374"
    };
    (dispatch as AppDispatch)(LoadNftSlice(collectionInfo));
  }

  const buyNft = (id: string | undefined) => {
    if (id) {
      const url = `https://opensea.io/assets/matic/0x710e9161e8a768c0605335ab632361839f761374/${id}`;
      window.open(url, '_blank');
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container className="pt-[1.5rem] lg:pt-6">
      {/* <div className="relative">
        <img src="img/collections/collection_banner.jpg" alt="banner" className="h-[18.75rem] object-cover" />
      </div> */}

      <div className="container flex justify-center">
        <div className="text-center ">
          <figure className="mb-4">

            <div
              className="bottom-0 flex items-center justify-center rounded-full border-2  p-4 pl-12 border-white  "
              data-tippy-content="Verified Collection"
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="img/logo.png"
                alt="collection avatar"
                className="bottom-0 flex items-center justify-center rounded-full border-2  p-4  border-white  "

                width="200"
                height="200"
              />
              <div className='bg-green relative top-20 right-28'>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="44"
                  height="44"
                  className="h-[1.875rem] w-[1.875rem] fill-white border "
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                </svg>
              </div>

            </div>
          </figure>
          <h2 className="mb-2 font-display text-4xl font-medium ">Metakul NFT Collection</h2>
          <div className="mb-2">
            <span className="text-sm font-bold text-jacarta-400">Created by </span>
            <a href="https://www.linkedin.com/in/shubham-kunwar-90ba441ba/" target="_balnk" className="text-sm font-bold text-accent">Kunwar.eth</a>
            <CustomDialog
              open={isDialogOpen}
              onClose={() => setDialogOpen(!isDialogOpen)}
              triggerButtonText={"Admin Login"}
              title={"Login Now"}
              description={"This is description for Login"}
            >
              <LoginForm
                loginTitle="Admin Login"
              />
            </CustomDialog>
          </div>

          <div
            className="mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border   "
          >
            <div
              className="w-1/2 rounded-l-xl border-r border-b  border-jacarta-100 py-4 hover:shadow-md  sm:w-24"
            >
              <div className="mb-1 text-base font-bold  ">777</div>
              <div className="text-2xs font-medium tracking-tight ">Items</div>
            </div>
            <div
              className="w-1/2 border-jacarta-100 py-4 hover:shadow-md border-b  sm:w-24 sm:border-r"
            >
              <div className="mb-1 text-base font-bold  ">32</div>
              <div className="text-2xs font-medium tracking-tight ">Owners</div>
            </div>
            <div
              className="w-1/2 border-r border-jacarta-100  py-4 hover:shadow-md  sm:w-32"
            >
              <div
                className="mb-1 flex items-center justify-center text-base font-medium  "
              >
                <span className="-mt-px inline-block" data-tippy-content="ETH">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    viewBox="0 0 1920 1920"

                    className="h-4 w-4"
                  >
                    <path fill="#8A92B2" d="M959.8 80.7L420.1 976.3 959.8 731z" />
                    <path fill="#62688F" d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z" />
                    <path fill="#454A75" d="M959.8 1295.4l539.8-319.1L959.8 731z" />
                    <path fill="#8A92B2" d="M420.1 1078.7l539.7 760.6v-441.7z" />
                    <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z" />
                  </svg>
                </span>
                <span className="font-bold">0</span>
              </div>
              <div className="text-2xs font-medium tracking-tight ">Floor Price</div>
            </div>
            <div className="w-1/2 rounded-r-xl border-jacarta-100 py-4 hover:shadow-md sm:w-32"
            >
              <div
                className="mb-1 flex items-center justify-center text-base font-medium  "
              >
                <span className="-mt-px inline-block" data-tippy-content="ETH">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    viewBox="0 0 1920 1920"
                    className="h-4 w-4"
                  >
                    <path fill="#8A92B2" d="M959.8 80.7L420.1 976.3 959.8 731z" />
                    <path fill="#62688F" d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z" />
                    <path fill="#454A75" d="M959.8 1295.4l539.8-319.1L959.8 731z" />
                    <path fill="#8A92B2" d="M420.1 1078.7l539.7 760.6v-441.7z" />
                    <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z" />
                  </svg>
                </span>
                <span className="font-bold">0 K</span>
              </div>
              <div className="text-2xs font-medium tracking-tight ">Volume Traded</div>
            </div>
          </div>

          <p className="mx-auto max-w-xl text-lg ">
            Unique NFT&apos;s built to unite the design multiverse. Designed and styled by Metakul.
            Join Discord to know about the free claiming of Metakul NFT
          </p>

          <SocialProfiles/>
          <ConnectWallet style={{
            marginTop: "20px"
          }} />
        </div>
      </div>


      <div className="">
        <ul
          className="nav nav-tabs mb-2 flex items-center justify-center border-b border-jacarta-100 "
          role="tablist"
        >

          <li className="nav-item" role="presentation">
            <button
              className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover: "
              id="activity-tab"
              data-bs-toggle="tab"
              data-bs-target="#activity"
              type="button"
              role="tab"
              aria-controls="activity"
              aria-selected="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M4 5v14h16V5H4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm11.793 6.793L13 8h5v5l-1.793-1.793-3.864 3.864-2.121-2.121-2.829 2.828-1.414-1.414 4.243-4.243 2.121 2.122 2.45-2.45z"
                />
              </svg>
              <span className="font-display text-base font-medium">All NFTs</span>
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="items" role="tabpanel" aria-labelledby="items-tab">
            <div className="mb-8 flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap items-center">
                <div className="my-1 mr-2.5">
                  <button
                    className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold  transition-colors hover:border-transparent      "
                    id="blockchainFilter"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"

                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-1 h-4 w-4 fill-jacarta-300 transition-colors group-hover:fill-white "
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M20 16h2v6h-6v-2H8v2H2v-6h2V8H2V2h6v2h8V2h6v6h-2v8zm-2 0V8h-2V6H8v2H6v8h2v2h8v-2h2zM4 4v2h2V4H4zm0 14v2h2v-2H4zM18 4v2h2V4h-2zm0 14v2h2v-2h-2z"
                      />
                    </svg>
                    <span>Metakul Collection</span>
                  </button>

                </div>

                <div className="my-1 mr-2.5">
                  <button
                    className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold  transition-colors hover:border-transparent      "
                    id="categoriesFilter"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"

                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-1 h-4 w-4 fill-jacarta-300 transition-colors group-hover:fill-white "
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M14 10v4h-4v-4h4zm2 0h5v4h-5v-4zm-2 11h-4v-5h4v5zm2 0v-5h5v4a1 1 0 0 1-1 1h-4zM14 3v5h-4V3h4zm2 0h4a1 1 0 0 1 1 1v4h-5V3zm-8 7v4H3v-4h5zm0 11H4a1 1 0 0 1-1-1v-4h5v5zM8 3v5H3V4a1 1 0 0 1 1-1h4z"
                      />
                    </svg>
                    <span>Web3</span>
                  </button>

                </div>
                <div className="my-1 mr-2.5">
                  <button
                    className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold  transition-colors hover:border-transparent      "
                    id="saleTypeFilter"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"

                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-1 h-4 w-4 fill-jacarta-300 transition-colors group-hover:fill-white "
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM13 10V5l-5 7h3v5l5-7h-3z"
                      />
                    </svg>
                    <span>Polygon</span>
                  </button>

                </div>
                <div className="my-1 mr-2.5">
                  <button
                    className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100  px-4 font-display text-sm font-semibold  transition-colors hover:border-transparent      "
                    id="priceRangeFilter"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"

                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="mr-1 h-4 w-4 fill-jacarta-300 transition-colors group-hover:fill-white "
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M17 16h2V4H9v2h8v10zm0 2v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3zM5.003 8L5 20h10V8H5.003zM7 16h4.5a.5.5 0 1 0 0-1h-3a2.5 2.5 0 1 1 0-5H9V9h2v1h2v2H8.5a.5.5 0 1 0 0 1h3a2.5 2.5 0 1 1 0 5H11v1H9v-1H7v-2z"
                      />
                    </svg>
                    <span>Gasless</span>
                  </button>


                </div>
              </div>


            </div>

            <div className="grid grid-cols-2 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
              <NftCard balance={balance} loadingMessage='Loading Nfts From Metakul Colelction' handleNftButtonText={"Buy Now"} onHandleButtonClick={buyNft} />

              <div className="block ml-2 rounded-2.5xl border border-jacarta-100 p-[1\5rem] transition-shadow hover:shadow-lg max-w-80">
                <figure className="relative">

                  <div
                    className="absolute top-3 right-3 flex items-center space-x-1 rounded-md  p-2 "
                  >
                    <span
                      className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                      data-tippy-content="Favorite"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 fill-jacarta-500 hover:fill-red  "
                      >
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path
                          d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm "></span>
                  </div>
                </figure>
                <div className="mt-7 flex items-center justify-between">

                  <div className="dropup rounded-full  ">

                    <div className="mt-8 flex items-center justify-between">


                      <Button className="font-display text-sm font-semibold text-accent" onClick={handleLoadNft}>
                        Load More...
                      </Button>

                    </div>
                  </div>

                </div>
                <div className="mt-8 flex items-center justify-between">

                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#buyNowModal"
                  >
                  </button>

                </div>
              </div>
            </div>

          </div>


        </div>
      </div>
    </Container>
  );
};

export default MetakulCollection;
