import React, { useEffect, useState } from 'react';
import { Button, Stack, Skeleton, Box, Grid } from '@mui/material';
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

interface DropShipItemsProps {
  categoryType?: string;
  dropShipItems: IDropShipItem[]
  loading:boolean
}

const DropShipItems: React.FC<DropShipItemsProps> = ({ categoryType,dropShipItems,loading }) => {
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
    <div className="overflow-hidden mx-auto">
      <Grid container  sx={{ mb: 0 }}>
        {filteredItems.map((item: IDropShipItem, index: number) => (
          <Grid
            key={index}
            item
            xs={6}
            md={4}
          >
            <section className="relative py-4 ">
              <div className="flex flex-col rounded-2.5xltransition-shadow shadow-lg justify-center">
                <div className="rounded-[1.25rem] p-4 flex-row justify-center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}
                    onClick={() => item && item.id && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`)}
                  >
                    <CustomSwiper images={[`data:image/png;base64,${item.image}`, `data:image/png;base64,${item.image}`]} />
                  </Box>
                  <Grid container className="mt-8">
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
                    
                  </Box>
                    <Grid item xs={8}>
                      <h2
                        className="mb-4 font-display"
                        style={{ overflow: 'hidden' }}
                        onClick={() => item && item.id && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`)}
                      >
                        {item.title} <br />
                      </h2>
                    </Grid>
                    <Grid item xs={4} className="mx-auto flex justify-center pb-0">
                    <ShareButton link={`${itemLink}/SINGLE_DROPSHIP_ITEM/${item.title}/${item.id}`} />
                    </Grid>
                    <Grid item xs={8} className="mx-auto">
                      <h2
                        className="mb-2 font-display"
                        style={{ overflow: 'hidden' }}
                        onClick={() => handleOpenItem(item.id || '')}
                      >
                        Price: ₹{item.price}
                      </h2>
                    </Grid>
                    <Grid item xs={4} className="mx-auto flex justify-center">
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
                </div>
              </div>
            </section>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid key={index} item xs={6} md={4}>
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
      <div className="mx-auto flex flex-row justify-center">
        <Button
          variant="contained"
          sx={{ backgroundColor: getColors().blueAccent[800] }}
          onClick={handleLoadItems}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default DropShipItems;
