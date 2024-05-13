
'use client'
import Blogs from './Blogs';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import Link from 'next/link';

const Tab1 = () => {
  return (
    <>
      <h2 className="mb-4 text-center font-display text-lg font-medium ">
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
