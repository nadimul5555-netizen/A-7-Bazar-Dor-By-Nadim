import React from 'react';
import DatePage from "@/app/components/Date";
import heroImage from "@/assets/bazar-hero.png"
import Image from 'next/image';

const HeroPage = () => {
  return (
    <section className="mx-auto my-10 container px-4">
      <div className="flex min-h-[220px] items-center justify-between overflow-hidden shadow-sm rounded-2xl border border-gray-200 bg-white px-8 py-7">

        {/* Left */}
        <div className="max-w-[650px]">

          {/* তোমার DatePage */}
          <div className="mb-3 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-700 ">
            <DatePage />
          </div>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-[620px] text-sm leading-6 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <button
            type="button"
            className="mt-5 rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-700"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right image */}
        <div className="hidden shrink-0 md:block">
          <Image
            src={heroImage}
            width={300}
            height={300}
            alt="বাজারের পণ্য"
            className="h-auto w-[300px]"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default HeroPage;