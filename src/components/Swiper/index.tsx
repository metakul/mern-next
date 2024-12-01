import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';
// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';

interface CustomSwiperProps {
  images: string[];
  direction?: "horizontal" | "vertical" | undefined
  minDelay?: number; // Minimum delay in ms
  maxDelay?: number; // Maximum delay in ms
  pagination?:boolean,
  height?:string,
  onClick?: (index: number) => void;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({direction, images, minDelay = 3000, maxDelay = 5000,pagination=true,height="h-[360px]", onClick }) => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // Generate a random autoplay delay within the range
  const randomAutoplayDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const handleMouseEnter = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.start();
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: randomAutoplayDelay,
          disableOnInteraction: false,
        }}
        pagination={pagination === true ? { clickable: true } : undefined}
        mousewheel={true}
        direction={direction}
        navigation={false}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`mySwiper ${height}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images &&
          images.map((src, index) => (
            <Box key={index} >
              <SwiperSlide>
                <img
                onClick={() => onClick && onClick(index)}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="lazyload img-product object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"
                />
              </SwiperSlide>
            </Box>
          ))}
      </Swiper>
    </>
  );
};

export default CustomSwiper;