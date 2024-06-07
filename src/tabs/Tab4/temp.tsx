
import { Button, Container, Typography } from '@mui/material';
import SocialProfiles from '@/components/SocialProfile';
import Link from 'next/link';
import { getColors } from '@/app/layout/Theme/themes';
const Tab4 = () => {

  return (
    <Container >
      <div className=" flex flex-col justify-center items-center bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="img/25.png" alt="Logo" className="object-cover w-40 h-40 mb-8 rounded-full" />
        <h1 className="text-4xl font-bold mb-4">Metaverse, On a click.</h1>
        <p className="text-lg mb-8 px-4 md:px-0">We&apos;re working hard to bring you something awesome. Stay tuned!</p>
        <div className="flex justify-center items-center space-x-4">
          <SocialProfiles />
        </div>
        <Button variant='contained' sx={{
          m: 4,
          background:getColors().blueAccent[800]
        }} >
          <Link href={"/mint"}>
            <Typography sx={{
              color:getColors().primary[100]
            }}>
            Claim Free Nft Here
            </Typography>
          </Link>

        </Button>
      </div>
    </Container>
  );
};

export default Tab4;