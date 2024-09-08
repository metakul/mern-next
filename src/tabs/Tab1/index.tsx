
'use client'
import Blogs from './Blogs';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import Link from 'next/link';

const Tab1 = () => {

  return (
    <>
    <h1>
      Metakul
    </h1>
      <h2 className="mb-4 px-auto py-auto text-center font-display text-lg font-medium flex justify-center item-center">
        METAKUL - <Link target="_blank" className="text-blue " href="https://www.erc4337.io/">
          Member of the 4337 Revolution
        </Link>
      </h2>
        <>
          <MarqueeCryptoNew />
          <Blogs />
        </>
    </>
  );
};

export default Tab1;
