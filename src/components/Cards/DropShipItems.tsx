import React, { useEffect, useState } from 'react';
import { Button, Stack, Skeleton, Box, Grid, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { IDropShipItem } from '@/Datatypes/interfaces/interface';
import ShareButton from '@/components/Elements/Buttons/ShareButton';
import { getColors } from '@/layout/Theme/themes';
import { fetchDropShipItemsApi } from '@/lib/slices/DropShip/DropShipAPI';
import { selectedDropShipItems } from '@/lib/slices/DropShip/DropShipSlice';
import { DropShipStatusInfo, Pages } from '@/Datatypes/enums';
import DropShipItemDetails from '@/components/DropShipItemDetails';
import AddToCart from '@/components/AddToCart';
import CustomSwiper from '@/components/Swiper';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Scroll from '@/components/Motion/scroll';
import { CartItem } from '@/lib/slices/DropShip/AddToCartSlice';

interface DropShipItemsProps {
  categoryType?: string;
  dropShipItems: IDropShipItem[]
  loading: boolean
  showScroll?: boolean
  grid?: number
}

const DropShipItems: React.FC<DropShipItemsProps> = ({ categoryType, dropShipItems, loading, showScroll, grid }) => {
  const dispatch = useDispatch();
  const [page, setItemPage] = useState(1);
  const [showItemPerPage] = useState(40);
  const [openedItemId, setOpenedItemId] = useState<string | null>(null);
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  const handleLoadItems = async () => {
    try {
      (dispatch as AppDispatch)(
        fetchDropShipItemsApi({
          pageSize: 10,
          page,
          setItemPage,
          status: DropShipStatusInfo.APPROVED,
        })
      );
    } catch (error) {
      console.error("Failed to fetch DropShip items:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.origin);
    }
  }, []);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
  };
  const itemLink = currentDomain ? `${currentDomain}` : '';

  useEffect(() => {
    // Load items when the component mounts
    handleLoadItems();
  }, []);

  const handleOpenItem = (id: string | null) => {
    setOpenedItemId(id === openedItemId ? null : id);
  };

  // Filter items by categoryType if provided
  const filteredItems = categoryType
    ? dropShipItems.filter((item: IDropShipItem) =>
      item.categories?.includes(categoryType)
    )
    : dropShipItems;

  return (
    <Container className="overflow-hidden mx-auto">
      {showScroll ? (

        <Scroll loading={loading} parsedNotes={filteredItems as unknown as CartItem[]} />
      ) : (
        <>
          <Grid container gap={0} sx={{ mb: 0 }}>

            {filteredItems.map((item: IDropShipItem, index: number) => (
              <Grid
                key={index}
                xs={grid =6}
                sm={grid = 6}
                md={grid =4}
                lg={grid =4}
                className='p-4 overflow-hidden'
              >
                <Grid item xs={12}
                  className="flex"
                  onClick={() => item && item.id && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`)}
                >

                    <CustomSwiper images={[`data:image/png;base64,${item.image}`, `data:image/png;base64,${item.image}`]} />
                </Grid>
                <Grid container className="mt-2 px-2 sm:px-4 md:px-4 lg:px-6">

                  <Grid item xs={8}>
                    <h2
                      className="mb-2 font-display"
                      style={{ overflow: 'hidden' }}
                      onClick={() => item && item.id && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`)}
                    >
                      {item.title} <br />
                    </h2>
                    <h2
                      className=" font-display"
                      style={{ overflow: 'hidden' }}
                      onClick={() => handleOpenItem(item.id || '')}
                    >
                      Price: ₹{item.price}
                    </h2>
                  </Grid>

                  <Grid item xs={4} className="mx-auto flex justify-center mb-2">

                    {item.id && item.title && (
                      <AddToCart
                        _id={item.id}
                        name={item.title}
                        image={item.image}
                      />
                    )}
                  </Grid>
                  <DropShipItemDetails
                    isDropShipItemInfoOpen={openedItemId === item.id}
                    price={item.price}
                    _dropShipItemId={item.id || ''}
                    name={item.title}
                    image={item.image}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </>

      )}


      {loading && !showScroll && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid key={index} item xs={grid == 2 ? 12 : 6}
              md={grid == 2 ? 12 : 6}
              lg={grid == 2 ? 6 : 4}
            >
              <Stack spacing={1} className="relative py-4 mt-4">
                <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">
                  <div className="rounded-[1.25rem] p-4 flex-row justify-center">
                    <Skeleton variant="rounded" width="100%" height="400px" />
                  </div>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && 
      <div className="mx-auto flex flex-row justify-center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: getColors().blueAccent[900],
            color: getColors().blueAccent[100],
          }}
          onClick={handleLoadItems}
        >
          Load More
        </Button>
      </div>
      }
    </Container>
  );
};

export default DropShipItems;
