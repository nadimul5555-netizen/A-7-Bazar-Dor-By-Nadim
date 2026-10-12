'use client'
import Link from "next/link";
import { CategoryType } from "../AllTypes";
import { usePathname } from "next/navigation";

export type PathNameProps = {
  data: CategoryType[]
}

const PathName = ({ data }: PathNameProps) => {
  const pathname = usePathname()
  return (
    <div className='flex gap-10 mt-2 container mx-auto pb-2'>
      {
        data.map((categori:CategoryType,ind:number)=>(
        <Link href={`/Slug/${categori.id}`} key={ind} className={`${pathname === `/Slug/${categori.id}`? "bg-green-700 rounded-2xl px-2 py-1":''  }`}>
            <span>{categori.icon}</span>{categori.nameBn}
          </Link>
        ))
      }
    </div>
  )
}

export default PathName;