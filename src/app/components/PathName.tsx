"use client"
import Link from "next/link";
import { CategoryType } from "../AllTypes";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type PathNameProps = {
  data: CategoryType[]
}

const PathName = ({ data }: PathNameProps) => {
  const pathname = usePathname()
  const [menu, setMenu] = useState(false)

  return (
    <div className="container mx-auto px-3 pb-2">
      <div className="relative sm:hidden">
        <button onClick={() => setMenu(!menu)} className="flex items-center justify-between w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium">
          <span>{data.find((category) => pathname === `/Slug/${category.id}`)?.nameBn || "ক্যাটাগরি নির্বাচন করুন"}</span>
          <span>{menu ? "▲" : "▼"}</span>
        </button>
        {menu && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
            {data.map((categori: CategoryType, ind: number) => (
              <Link href={`/Slug/${categori.id}`} key={ind} onClick={() => setMenu(false)} className={`block rounded-lg px-3 py-2 text-sm ${pathname === `/Slug/${categori.id}` ? "bg-green-700 text-white" : "hover:bg-green-50"}`}>
                <span className="mr-2">{categori.icon}</span>{categori.nameBn}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-4 md:gap-6 lg:gap-10">
        {data.map((categori: CategoryType, ind: number) => (
          <Link href={`/Slug/${categori.id}`} key={ind} className={`rounded-lg px-2 py-1 text-sm md:text-base ${pathname === `/Slug/${categori.id}` ? "bg-green-700 text-white" : "hover:bg-green-50"}`}>
            <span className="mr-1">{categori.icon}</span>{categori.nameBn}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PathName;

