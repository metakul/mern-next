import React, { useMemo, useState } from 'react';
import { BalanceItem } from '@/Datatypes/interfaces/interface';
import { Button, CircularProgress, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/Datatypes/enums';
import { getColors } from '@/layout/Theme/themes';

interface Props {
  isLoading?:boolean
  balance: BalanceItem[];
  loadingMessage: string;
  handleNftButtonText?: string;
  onHandleButtonClick?: (id: string) => void;
  address?: string;
}

const NftCard: React.FC<Props> = ({isLoading, loadingMessage, balance, handleNftButtonText, onHandleButtonClick,address }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [staking, setStaking] = useState<boolean>(false);
  
  // Memoize the initial button text based on handleNftButtonText
  const initialButtonText = useMemo(() => handleNftButtonText || 'Stake NFT', [handleNftButtonText]);
  const [buttonText, setButtonText] = useState<string>(initialButtonText);

  const navigate = useNavigate(); 

  const handleNavigate = (href: string) => {
    navigate(href);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  async function opensea(id: string | undefined) {
    window.open(
      `https://opensea.io/assets/matic/${address}/${id}`
    );
  }
  const openDiscord = () => {
    window.open(
      `https://discord.gg/wMcv6HW6VJ`
    );
  }
 
  return (
    <>
    {isLoading ? (
  // Show loading spinner or message
  <div className="spinner">{loadingMessage}</div>
    ): balance && balance.length > 0 ? (
        balance.map((item: BalanceItem, index: number) => (
          <article className='flex justify-center ' key={index}>
          <div className="flex flex-col justify-center items-center ml-[auto] mr-[auto] rounded-2.5xl border border-jacarta-100 p-[1.5rem] transition-shadow hover:shadow-lg">
              <figure className="relative">
                  <img
                    src={item?.metadata?.image}
                    alt={`item ${index + 1}`}
                    className=" rounded-t-2.5xl border max-w-[160px] md:max-w-[200px] object-cover"
                    loading="lazy"
                  />
                <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md  p-2">
                  <span
                    className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
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
                  <span className="font-display text-base hover:text-accent">{item?.metadata?.name}</span>
                <div>
                  <Button
                    id={`itemActions${index}`}
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={handleClick}
                    className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center text-sm"
                  >
                    <svg
                      width="16"
                      height="4"
                      viewBox="0 0 16 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-jacarta-500"
                    >
                      <circle cx="2" cy="2" r="2" />
                      <circle cx="8" cy="2" r="2" />
                      <circle cx="14" cy="2" r="2" />
                    </svg>
                  </Button>
                  <Menu
                    id={`menu-${index}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': `itemActions${index}`,
                    }}
                  >
                    {/* <MenuItem onClick={handleClose}>New bid</MenuItem> */}
                    {/* <MenuItem onClick={handleClose}>Refresh Metadata</MenuItem> */}
                    
          
          <MenuItem onClick={() => opensea(item.metadata?.id)}>View on <img src="/Images/opensea-logo.svg" alt="opensea" className="h-6 w-6 ml-2" /> </MenuItem>
                    <MenuItem onClick={()=>openDiscord()}>Report </MenuItem>
                  </Menu>
                </div>
              </div>
              {onHandleButtonClick &&
              <div className="mt-4 flex items-center justify-between ml-4">
                {item && item?.metadata?.id ? (
                 <Button
                 sx={{
                   backgroundColor: getColors().grey[800],
                   mb: 2,
                   "&.Mui-disabled": {
                     color: getColors().grey[300],
                   },
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   width: '120px',
                   height: '44px',
                 }}
                 disabled={staking}
                 onClick={async () => {
                   try {
                     setStaking(true);
                     setButtonText("Staking Now");
                     if (item && item.metadata) {
                       await onHandleButtonClick(item.metadata.id);
                     }
                     setStaking(false);
                     setButtonText(initialButtonText);
                   } catch (error) {
                     console.error(error);
                     setStaking(false);
                     setButtonText(initialButtonText);
                   }
                 }}
               >
                 {staking ? (
                   <CircularProgress size={24} sx={{ color: getColors().grey[100] }} />
                 ) : (
                   <Typography
                     variant="h5"
                     sx={{
                       color: getColors().blueAccent[100],
                     }}
                   >
                     {buttonText}
                   </Typography>
                 )}
               </Button>
                ) : (
                  <h3>Not Minted Yet</h3>
                )}
              </div>
              }
            </div>
          </article>
        ))
      ) : (
        <div className='text-center'>
          <Typography >
            Visit to Mint Your Own NFT
          </Typography>
          <Typography color="primary" onClick={() => handleNavigate(Pages.MINT)}>
          <Button >
          Claim Now

          </Button>
          </Typography>
        </div>
      )}
    </>
  );
};

export default NftCard;