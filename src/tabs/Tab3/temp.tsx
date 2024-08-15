
import { Container } from '@mui/material';
import SocialProfiles from '@/components/SocialProfile';
const Tab3 = () => {

  return (
    <Container className="">
      <div className=" flex flex-col justify-center items-center bg-gray-100">
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/5.png" alt="Logo" className="object-cover w-40 h-40 mb-8 rounded-full" />
        <h1 className="text-4xl font-bold mb-4">Gasless DEX with Metakul Nfts.</h1>
        <p className="text-lg mb-8 px-4 md:px-0">We&apos;re working hard to bring you something awesome. Stay tuned!</p>
        <div className="flex justify-center items-center space-x-4">
          <SocialProfiles/>
           </div>
      </div>
    </Container>
  );
};

export default Tab3;