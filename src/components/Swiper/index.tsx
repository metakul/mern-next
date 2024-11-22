import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';

interface CustomSwiperProps {
  images: string[];
  autoplayDelay?: number;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ images, autoplayDelay = 2500 }) => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >

        {images && images.map((src, index) => (
          <Box sx={{
            border:"40px solid grey"
          }}>

          <SwiperSlide key={index} 
          >
            <img src={src} alt={`Slide ${index + 1}`} className="border rounded-xl border-xl object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"/>
          </SwiperSlide>
            </Box>
        ))}
        {/* <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div> */}
      </Swiper>
    </>
  );
};

export default CustomSwiper;
