import Image from "next/image";
import { CategoryType, PonnoType } from "../AllTypes";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css"



const MarqueePage =async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return (
    <MarqueeText direction="right" className="my-1 border-b" duration={10}>
    <div>
      {
        data.map((Data:PonnoType,ind:number)=>(
          <span key={ind} >

      <span className="mx-5 " >
  {Data.image} {Data.nameBn} {Data.today.toLocaleString("bn-BD")} টাকা/কেজি{" "}

  {Data.change.dir === "up" && (
    <>
      <span className="text-red-500 ">▲</span>{" "}
      {Data.change.pct.toLocaleString("bn-BD")}
    </>
  )}

  {Data.change.dir === "down" && (
    <>
      <span className="text-green-500">▼</span>{" "}
      <span className="text-green-500">{Data.change.pct.toLocaleString("bn-BD")}</span>
    </>
  )}

  {Data.change.dir === "flat" && (
    <>
      <span className="text-gray-400">—</span>{" "}
      {Data.change.pct.toLocaleString("bn-BD")}
    </>
  )}
</span>
  </span>
        ))
      }
    </div>
    </MarqueeText>
  )
}

export default MarqueePage;