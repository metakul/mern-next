import React, { useMemo, useState } from 'react';
import { BalanceItem } from '@/Datatypes/interfaces/interface';
import { Box, Button, CircularProgress, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/Datatypes/enums';
import { getColors } from '@/layout/Theme/themes';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
interface Props {
  isLoading?: boolean
  balance: BalanceItem[];
  loadingMessage: string;
  handleNftButtonText?: string;
  onHandleButtonClick?: (id: string, nftContractAddress?: string) => void;
  address?: string;
  buyoutBidAmount?: string;
}

const NftCard: React.FC<Props> = ({ isLoading, loadingMessage, balance, handleNftButtonText, onHandleButtonClick, address, buyoutBidAmount }) => {
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
      ) : balance && balance.length > 0 ? (
        balance.map((item: BalanceItem, index: number) => (
          <Box className="flex flex-col justify-center items-center  rounded-2.5xl border border-jacarta-100 p-[1rem] transition-shadow hover:shadow-lg  ">

            <figure className="relative">
              <img
                src={item?.metadata?.image}
                alt={`item ${index + 1}`}
                className=" rounded-t-2.5xl border object-cover  w-[140px] h-[140px] md:w-[200px] md:h-[180px]"
                loading="lazy"
              />
              <Box className="absolute top-3 right-3 flex items-center space-x-1 rounded-md p-2"
                sx={{
                  onHover: {
                    backgroundColor: getColors().redAccent[100],
                  },
                }}>
                <FavoriteBorderIcon />
                <span className="text-sm"></span>
              </Box>
            </figure>
            <div className="mt-4 ml-4 flex items-center justify-between">
              <span className="font-display text-sm hover:text-accent">{item?.metadata?.name}</span>
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
                  <MenuItem onClick={() => openDiscord()}>Report </MenuItem>
                </Menu>
              </div>
            </div>
            {onHandleButtonClick &&
              <div className="mt-4 flex items-center justify-between ">
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
                        if (item && item?.metadata && address) {
                          await onHandleButtonClick(item.metadata.id, address);
                        }
                        if (item && item?.metadata) {
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
                        variant="body1"
                        sx={{
                          color: getColors().blueAccent[100],
                        }}
                      >
                        {buttonText} <br /> {buyoutBidAmount && `${buyoutBidAmount} $KULL`}
                      </Typography>
                    )}
                  </Button>
                ) : (
                  <h3>Not Minted Yet</h3>
                )}
              </div>
            }
          </Box>
        ))
      ) : (
        <div className='text-center'>
          <Typography >
            Visit to Mint Your Own NFT
          </Typography>
          <Typography color="primary" onClick={() => handleNavigate(Pages.CREATE_NFT)}>
            <Button >
              Create Now

            </Button>
          </Typography>
        </div>
      )}
    </>
  );
};

export default NftCard;