import Link from "next/link";
import { PonnoType } from "../AllTypes";

export type PriceLowPageProps = {
  data: PonnoType[];
};

const PriceLowPage = ({ data = [] }: PriceLowPageProps) => {
  const UpData = data.filter((Data) => Data.change.dir === "down");

  return (
    <section className="mx-10 container mx-auto ">
      
      <div className="m-4 flex items-center gap-2 ">
        <span className="text-sm font-bold text-green-500">▲</span>
        <h1 className="text-2xl font-bold text-gray-800 ">
          আজকে দাম কমেছে
        </h1>
      </div>

     
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mx-5 ">
        {UpData.slice(0,6).map((Data) => (
          <Link
            href="/"
            key={Data.id}
            className="group rounded-2xl border border-gray-200 bg-[#fbfdfb] p-3 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:border-green-200 hover:shadow-md"
          >
            
            <div className="m-2 flex items-center gap-3 ">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl transition-transform duration-300 group-hover:scale-105">
                {Data.image}
              </div>

              <div>
                <h2 className="font-semibold text-gray-800">
                  {Data.nameBn}
                </h2>

                <p className="text-xs text-gray-500">
                  প্রতি কেজি
                </p>
              </div>
            </div>

            
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="mx-2 text-xs text-gray-500">
                  আজকের দাম
                </p>

                <div className="flex my-3 mx-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                  {Data.today.toLocaleString("bn-BD")}
                </h3> <span className="m-2  text-gray-500">টাকা</span>
                </div>
              </div>

              
              <div className="m-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                <span className="text-[10px] text-green-500">
                  ▲
                </span>

                <span className="text-xs font-semibold text-green-700">
                  {Data.change.pct}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PriceLowPage;