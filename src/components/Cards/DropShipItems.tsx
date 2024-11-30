import React, { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Button, Stack, Skeleton, Box, Grid, Container, Typography } from '@mui/material';
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
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Scroll from '@/components/Motion/scroll';
import { CartItem } from '@/lib/slices/DropShip/AddToCartSlice';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from "swiper/modules";
import QuickAdd from '../QuickAdd';

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

  const [quickAddItem, setQuickAddItem] = useState<IDropShipItem | null>(null);

  const handleQuickAdd = (item: IDropShipItem) => {
    setQuickAddItem(item);
  };


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
      <div className="" >
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <div className="flex flex-1 items-center  gap-10 align-items-center">
            <div className="nav-prev-slider nav-prev-product  snbp114">
              <span className="icon icon-arrow1-left" />
            </div>
            <Link
              to={`/product-style-05`}
              className="tf-btn btn-line m-0 fs-12 fw-6 mt-0"
            >
              <Typography>
                VIEW ALL
              </Typography>
            </Link>
            <div className=" nav-next-slider nav-next-product snbn114">
              <span className="icon icon-arrow1-right" />
            </div>
          </div>
        </div>
        <section className="flat-spacing-2 pt_0">
          <div className="container">
            <div className="hover-sw-nav hover-sw-2">
              <Swiper
                dir="ltr"
                className="swiper tf-sw-product-sell wrap-sw-over"
                style={{
                  height: "500px"
                }}
                slidesPerView={4} // Equivalent to data-preview={4}
                spaceBetween={30} // Equivalent to data-space-lg={30}
                breakpoints={{
                  1024: {
                    slidesPerView: 4, // Equivalent to data-tablet={3}
                  },
                  640: {
                    slidesPerView: 3, // Equivalent to data-tablet={3}
                  },
                  0: {
                    slidesPerView: 2, // Equivalent to data-mobile={2}
                    spaceBetween: 15, // Equivalent to data-space-md={15}
                  },
                }}
                modules={[Navigation]}
                navigation={{
                  prevEl: ".snbp114",
                  nextEl: ".snbn114",
                }}
              >
                {filteredItems.map((item: IDropShipItem, index: number) => (

                  <SwiperSlide key={index} className="swiper-slide" >

                    <div className="card-product fl-item  " key={item.id}>
                      <div className="card-product-wrapper">
                        <Box sx={{
                          maxWidth:"230px"
                        }} onClick={() => item && item.id && handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`)} className="product-img">
                          <img
                            className="lazyload img-product"
                            data-src={item.image}
                            src={`data:image/png;base64,${item.image}`}
                            alt="image-product"
                            width={720}
                            height={1005}
                          />
                          <img
                            className="lazyload img-hover"
                            data-src={
                              item.image ? item.image : item.image
                            }
                            src={item.image ? `data:image/png;base64,${item.image}` : `data:image/png;base64,${item.image}`}
                            alt="image-product"
                            width={720}
                            height={1005}
                          />
                        </Box>
                        <div className="">
                          <div style={{
                            background: getColors().grey[900]
                          }}>

                            {item.id && item.title && (
                              <AddToCart
                                _id={item.id}
                              />
                            )}
                          </div>
                          
                          {/* <div style={{
                            background: getColors().grey[900]
                          }}>

                            {item.id && item.title && (
                              <AddToCart
                                _id={item.id}
                              />
                            )}
                          </div> */}
                          
                         
                        </div>

                        {item.sizes && (
                          <div className="size-list">
                            {item.sizes.map((size: any) => (
                              <span key={String(size)}>{String(size.sizeName)}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="card-product-info">
                        <Link to={`/product-detail/${item.id}`} className="title link">
                          {item.title}
                        </Link>
                        <span className="price">${item.price ? item.price.toFixed(2) : 'N/A'}</span>
                      </div>
                    </div>
                  </SwiperSlide>

))}
              </Swiper>
            </div>
          </div>

        </section>

      {/* Render QuickAdd Modal */}
      </div>


  );
};

export default DropShipItems;
