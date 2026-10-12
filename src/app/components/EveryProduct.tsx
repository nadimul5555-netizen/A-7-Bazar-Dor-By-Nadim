import Link from "next/link";
import { PonnoType } from "../AllTypes";

export type EveryProductProps = {
  data: PonnoType[];
};

const EveryProduct = ({ data = [] }: EveryProductProps) => {
  return (
    <div id="all-products" className="scroll-mt-24">
      <section className="my-10 container mx-auto ">
        {/* Heading */}
        <div>
          <div className="m-6 flex items-center gap-2 ">
            <h1 className="text-2xl font-bold text-gray-800 ">সব পণ্য</h1>
          </div>
          <p className=" m-6 text-xs text-gray-500">
            মোট {data.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mx-5 ">
          {data.map((Data) => (
            <Link
              href={`/Details/${Data.id}`}
              key={Data.id}
              className="group rounded-2xl border border-gray-200 bg-[#fbfdfb] p-3 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:border-green-200 hover:shadow-md"
            >
              {/* Product Name */}
              <div className="m-2 flex items-center gap-3 ">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl transition-transform duration-300 group-hover:scale-105">
                  {Data.image}
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">{Data.nameBn}</h2>

                  <p className="text-xs text-gray-500">
                    প্রতি{" "}
                    {Data.unit === "kg"
                      ? "কেজি"
                      : Data.unit === "piece"
                        ? "পিস"
                        : Data.unit === "litre"
                          ? "লিটার"
                          : "ডজন"}
                  </p>
                </div>
              </div>

              {/* Price Information */}
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="mx-2 text-xs text-gray-500">আজকের দাম</p>

                  <div className="flex my-3 mx-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {Data.today.toLocaleString("bn-BD")}
                    </h3>{" "}
                    <span className="m-2  text-gray-500">টাকা</span>
                  </div>
                </div>

                {/* Price Increase Percentage */}
                <div className="m-2 flex items-center gap-1 rounded-full bg-red-50 px-2 py-1">
                  {Data.change.dir === "up" && (
                    <>
                      <span className="text-red-500 ">▲</span>{" "}
                    </>
                  )}

                  {Data.change.dir === "down" && (
                    <>
                      <span className="text-green-500">▼</span>{" "}
                    </>
                  )}

                  {Data.change.dir === "flat" && (
                    <>
                      <span className="text-gray-400">—</span>{" "}
                    </>
                  )}

                  <span className="text-xs font-semibold text-red-500">
                    {Data.change.pct}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EveryProduct;
