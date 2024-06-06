import React, { useState } from 'react';
import { BalanceItem } from '@/Datatypes/interfaces/interface';
import { Button, Menu, MenuItem, Typography } from '@mui/material';

interface Props {
  balance: BalanceItem[];
  loadingMessage: string;
  handleNftButtonText: string;
  onHandleButtonClick: (id: string) => void;
}

const NftCard: React.FC<Props> = ({ loadingMessage, balance, handleNftButtonText, onHandleButtonClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {balance && balance.length > 0 ? (
        balance.map((item: BalanceItem, index: number) => (
          <article key={index}>
            <div className="block ml-2 rounded-2.5xl border border-jacarta-100 p-[1\5rem] transition-shadow hover:shadow-lg max-w-80">
              <figure className="relative">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item?.metadata?.image}
                    alt={`item ${index + 1}`}
                    className="w-full rounded-t-2.5xl border "
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
                    <MenuItem onClick={handleClose}>New bid</MenuItem>
                    <MenuItem onClick={handleClose}>Refresh Metadata</MenuItem>
                    <MenuItem onClick={handleClose}>Share</MenuItem>
                    <MenuItem onClick={handleClose}>Report</MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between ml-4">
                {item && item?.metadata?.id ? (
                  <Button sx={{
                    background:"white",
                    mb:2
                  }} onClick={() => item && item.metadata && onHandleButtonClick(item.metadata.id)}>
                   <Typography variant='h5'>

                    {handleNftButtonText}
                   </Typography>
                    </Button>
                ) : (
                  <h3>Not Minted Yet</h3>
                )}
              </div>
            </div>
          </article>
        ))
      ) : (
        <div>
          <Typography variant='h3' className='w-[100%]'>{loadingMessage}</Typography>
        </div>

      )}
    </>
  );
};

export default NftCard;
