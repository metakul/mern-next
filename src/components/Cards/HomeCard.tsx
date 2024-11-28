import { IDropShipItem } from '@/Datatypes/interfaces/interface'
import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomSwiper from '../Swiper'
import { Pages } from '@/Datatypes/enums'
import { useNavigate } from 'react-router-dom'

interface HomeCardProps {
  dropShipItems: IDropShipItem[]
}

function HomeCard({ dropShipItems }: HomeCardProps) {

  const navigate = useNavigate();
  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const handleImageClick = (index: number, itemIndex: number) => {
    const item = dropShipItems[itemIndex];
    if (item && item.id) {
      handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      <div className="flex flex-wrap">
        <div className="w-full md:w-[50vw] w-[50vw] h-[75vh] md:h-[100vh]">
          <CustomSwiper
            pagination={false}
            direction="vertical"
            height={"h-[80vh] md:h-[100vh]"}
            onClick={(index) => handleImageClick(index, index === 0 ? 0 : 2)}
            images={[
              `data:image/png;base64,${dropShipItems[0]?.image}`,
              `data:image/png;base64,${dropShipItems[2]?.image}`,
            ]}
          />
        </div>
        <div className=" h-[50vh] md:h-[100vh]">
          <CustomSwiper
            pagination={false}
            direction="horizontal"
            height={"h-[50vh] w-[100vw] md:w-[50vw]"}
            onClick={(index) => handleImageClick(index, index === 0 ? 4 : 8)}
            images={[
              `data:image/png;base64,${dropShipItems[4]?.image}`,
              `data:image/png;base64,${dropShipItems[8]?.image}`,
            ]}
          />
          <div className='hidden md:block'>

          <CustomSwiper
            pagination={false}
            direction="vertical"
            height={"h-[50vh]"}
            onClick={(index) => handleImageClick(index, index === 0 ? 7 : 1)}
            images={[
              `data:image/png;base64,${dropShipItems[7]?.image}`,
              `data:image/png;base64,${dropShipItems[1]?.image}`,
            ]}
          />
          </div>

        </div>
      </div>
    </Box>
  )
}

export default HomeCard;