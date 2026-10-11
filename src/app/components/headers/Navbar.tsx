
import Image from 'next/image';

import logo from '@/assets/logo-icon.png'
import { Button } from '@heroui/react';
import { CategoryType } from '@/app/AllTypes';
import DatePage from '../Date';
import MarqueePage from '../Marquee';



const Navbar = async() => {
const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories",{
next:{
  revalidate: 3600,
}});
const data = await res.json();




  return (
    <div>

    <div className='container mx-auto '>

    <div className='grid grid-cols-2  '>
      <div className='flex' >
        <span>

        <Image className='p-3 bg-green-700 rounded-2xl m-3' src={logo} height={60} width={60} alt='বাজার দর'></Image>
        </span>
     <div>
      <h1 className='font-bold text-2xl m-2'>বাজার দর</h1>
      <DatePage></DatePage>
     </div>
      </div>
      <div className='flex justify-end m-5'>
    <h1 className='my-2 mx-6'>সাইন ইন</h1>
    <Button className=' bg-green-700 rounded-lg'>সাইন আপ</Button>
      </div>
    </div>
   
    </div>
    <div className=' border-t border-b '>
 <div className='flex gap-10 mt-2 container mx-auto pb-2'>
      {
        data.map((categori:CategoryType,ind:number)=>(
          <h2 key={ind}>
            <span>{categori.icon}</span>{categori.nameBn}
          </h2>
        ))
      }
    </div>
    </div>
    <div>
      <MarqueePage/>
    </div>
    </div>
  );
};

export default Navbar;