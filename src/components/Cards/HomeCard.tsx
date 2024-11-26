import { IDropShipItem } from '@/Datatypes/interfaces/interface'
import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomSwiper from '../Swiper'

interface HomeCardProps {
  dropShipItems: IDropShipItem[]
}

function HomeCard({ dropShipItems }: HomeCardProps) {
  return (
    <Box sx={{ flexGrow: 1,m:0 ,p:0 }}>
      <div className="flex flex-wrap">
        <div className="w-full md:w-[50vw] w-[50vw] h-[100vh] ">
          <CustomSwiper
            pagination={false}
            direction="vertical"
            height={"h-[100vh] "}
            images={[
              `data:image/png;base64,${dropShipItems[0].image}`,
              `data:image/png;base64,${dropShipItems[2].image}`,
            ]}
          />
        </div>
       
        <div className="w-1/2  h-[100vh] ">
          <CustomSwiper
            pagination={false}
            direction="horizontal"
            height={"h-[50vh] w-[50vw]"}
            images={[
              `data:image/png;base64,${dropShipItems[4].image}`,
              `data:image/png;base64,${dropShipItems[8].image}`,
            ]}
          />
           <CustomSwiper
            pagination={false}
            direction="vertical"
            height={"h-[50vh]"}
            images={[
              `data:image/png;base64,${dropShipItems[8].image}`,
              `data:image/png;base64,${dropShipItems[4].image}`,
            ]}
          />
        </div>
       

      </div>
    </Box>
  )
}

export default HomeCard