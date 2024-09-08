
'use client'
import { isAuthenticated } from '@/lib/slices/authSlice';
import Blogs from './Blogs';
import MarqueeCryptoNew from '@/components/MarqueCrypto';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Tab1 = () => {

  const isUserAuthenticated = useSelector(isAuthenticated);
  const router = useRouter()


  useEffect(() => {
    if (isUserAuthenticated) {
      router.push('/admin/home')
    } else {
      console.error("User is not authenticated");
    }
  }, [isUserAuthenticated, router]);


  return (
    <>
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
