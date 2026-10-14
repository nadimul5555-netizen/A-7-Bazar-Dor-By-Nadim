
import Image from 'next/image';
import logo from '@/assets/logo-icon.png';
import { Button } from '@heroui/react';
import { CategoryType } from '@/app/AllTypes';
import DatePage from '../Date';
import MarqueePage from '../Marquee';
import Link from 'next/link';
import PathName from '../PathName';
import { Suspense } from 'react';
import ButtonPage from '../Buttons';

const Navbar = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
    next: {
      revalidate: 3600,
    },
  });
  const data = await res.json();

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-3 sm:px-5 md:px-6">
        <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-2 sm:items-center sm:gap-2">
          <div className="flex min-w-0 items-center">
            <Link href={'/'} className="shrink-0">
              <Image className="m-2 rounded-xl bg-green-700 p-2 sm:m-3 sm:p-3" src={logo} height={60} width={60} alt='বাজার দর' />
            </Link>
            <div className="min-w-0">
              <h1 className="m-1 text-xl font-bold sm:m-2 sm:text-2xl">বাজার দর</h1>
              <DatePage />
            </div>
          </div>
          <div className="flex justify-start sm:justify-end sm:p-2 md:m-3">
            <ButtonPage />
          </div>
        </div>
      </div>
      <div className="border-y border-gray-100">
        <div className="container mx-auto min-w-0 px-2 sm:px-4">
          <Suspense fallback={<div className="h-10" />}>
            <PathName data={data} />
          </Suspense>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <MarqueePage />
      </div>
    </div>
  );
};

export default Navbar;

