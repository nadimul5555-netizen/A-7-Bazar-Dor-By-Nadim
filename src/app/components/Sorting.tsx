'use client'
import React, { useState } from 'react';
import { PonnoType } from '../AllTypes';
import Link from 'next/link';

export interface SortingProps{
  data:PonnoType[];
}

const SortingPage = ({data}:SortingProps) => {
  const [sortBy,setSortBy]=useState<"default"|"price-low"|"price-high">("default")

const handleSorting =()=>{
 const newData = [...data];
 if(sortBy === 'price-high'){
  newData.sort((a,b)=> b.today - a.today)
 }
  if(sortBy === 'price-low'){
  newData.sort((a,b)=> a.today - b.today)
 }
 return newData
}
const AfterSortData = handleSorting()
  return (
    <div>
        <div>
        <div className="mb-3  flex items-center justify-between rounded-2xl border border-gray-200 bg-[#fbfdfb] py-8">
          <div></div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-500">
              সাজান
            </label>

            <select
              value={sortBy}
              onChange={(e)=> setSortBy(e.target.value as "default"|"price-low"|"price-high")}
              
              className="select select-bordered select-sm rounded-lg border-gray-300 bg-transparent text-gray-700 mx-5"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low"> কম থেকে বেশি</option>
              <option value="price-high"> বেশি থেকে কম</option>
              
            </select>
          </div>
        </div>
        <div>

   

        <h1 className="m-5 text-gray-500">
          মোট {data.length}টি পণ্য দেখানো হচ্ছে
        </h1>

        <div className="container mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AfterSortData.map((Data) => (
            <Link
            href={`/Details/${Data.id}`}
            key={Data.id}
            className="group rounded-2xl border border-gray-200 bg-[#fbfdfb] p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <div className="m-2 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl transition-transform duration-300 group-hover:scale-105">
                  {Data.image}
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">
                    {Data.nameBn}
                  </h2>

                  <p className="text-xs text-gray-500">প্রতি কেজি</p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="mx-2 text-xs text-gray-500">আজকের দাম</p>

                  <div className="my-3 mx-2 flex">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {Data.today.toLocaleString("bn-BD")}
                    </h3>

                    <span className="m-2 text-gray-500">টাকা</span>
                  </div>
                </div>

                <div className="m-2 flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1">
                  {Data.change.dir === "up" && (
                    <span className="text-red-500">▲</span>
                  )}

                  {Data.change.dir === "down" && (
                    <span className="text-green-500">▼</span>
                  )}

                  {Data.change.dir === "flat" && (
                    <span className="text-gray-400">—</span>
                  )}

                  <span
                    className={`text-xs font-semibold ${
                      Data.change.dir === "up"
                      ? "text-red-500"
                      : Data.change.dir === "down"
                      ? "text-green-500"
                      : "text-gray-500"
                    }`}
                    >
                    {Number(Data.change.pct).toLocaleString("bn-BD")}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      
    </div>
    </div>
  );
};

export default SortingPage;
  