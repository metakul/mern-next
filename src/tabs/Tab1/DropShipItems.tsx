import { Button, Stack, Skeleton, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { IDropShipItem } from '@/Datatypes/interfaces/interface';
import ShareButton from '@/components/Elements/Buttons/ShareButton';
import { useEffect, useState } from 'react';
import { getColors } from '@/layout/Theme/themes';
import { fetchDropShipItemsApi } from '@/lib/slices/DropShip/DropShipAPI';
import { selectedDropShipItems } from '@/lib/slices/DropShip/DropShipSlice';
import { DropShipStatusInfo } from '@/Datatypes/enums';
import DropShipItemDetails from '@/components/DropShipItemDetails';

const DropShipItems = () => {
  const dispatch = useDispatch();
  const { dropShipItems, loading } = useSelector(selectedDropShipItems);
  const [page, setItemPage] = useState(1);
  const [pageSize] = useState(4);
  const [openedItemId, setOpenedItemId] = useState<string | null>(null);

  const handleLoadItems = async () => {
    try {
      (dispatch as AppDispatch)(fetchDropShipItemsApi({
        pageSize,
        page,
        setItemPage,
        status: DropShipStatusInfo.APPROVED
      }));
    } catch (error) {
      console.error("Failed to fetch DropShip items:", error);
    }
  };

  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.origin);
    }
  }, []);

  const itemLink = currentDomain ? `${currentDomain}` : '';

  useEffect(() => {
    // Load items when the component mounts
    handleLoadItems();
  }, []);

  const handleOpenItem = (id: string | null) => {
    setOpenedItemId(id === openedItemId ? null : id);
  };

  return (
    <div className="sm:w-full overflow-hidden mx-auto">
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {dropShipItems.map((item: IDropShipItem, index: number) => (
          <Grid
            key={index}
            item
            xs={6} // 2 items per row on small screens (xs)
          >
            <section className="relative py-4">
              <div className="flex flex-col rounded-2.5xl border border-jacarta-300 transition-shadow shadow-lg justify-center">
                <div className="rounded-[1.25rem] p-4 flex-row justify-center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <img
                      src={`data:image/png;base64,${item.image}`}
                      alt="Item image"
                      className="w-[16em] h-[16em] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"
                      onClick={() => handleOpenItem(item.id || '')}
                    />
                  </Box>
                  <Grid container className="mt-8">
                    <Grid item xs={8} md={8} lg={8}>
                      <span className="inline-flex flex-wrap items-center space-x-1 text-accent">
                        {item.categories.map((category, index) => (
                          <h5 key={index}>{category}</h5>
                        ))}
                      </span>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className="mx-auto flex flex-end justify-end pr-8 pb-4">
                      <ShareButton link={`${itemLink}`} />
                    </Grid>
                    <h2 className="mb-4 font-display text-md truncate" style={{ height: '2.5rem', overflow: 'hidden' }} onClick={() => handleOpenItem(item.id || '')}>
                      {item.title
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </h2>
                    <DropShipItemDetails
                      isDropShipItemInfoOpen={openedItemId === item.id}
                      price={item.price}
                      _dropShipItemId={item.id || ''}
                    />
                    {/* Add any additional item details here */}
                  </Grid>
                </div>
              </div>
            </section>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Array.from({ length: pageSize }).map((_, index) => (
            <Grid key={index} item xs={6}>
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
        <Button variant="contained" sx={{ backgroundColor: getColors().blueAccent[800] }} onClick={handleLoadItems}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default DropShipItems;