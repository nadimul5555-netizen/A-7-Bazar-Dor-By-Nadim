import { Suspense } from "react";
import { ParamsType, PonnoType } from "@/app/AllTypes";

type ParamsPageProps = {
  params: Promise<ParamsType>;
};

const ProductContent = async ({ params }: ParamsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: PonnoType = await res.json();

  const formatNumber = (value: number) => value.toLocaleString("bn-BD");

  const markets = data.markets || [];

  const allPrices = markets.flatMap((market) => [market.min, market.max]);

  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;

  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

  const averagePrice = allPrices.length
    ? allPrices.reduce((total, price) => total + price, 0) / allPrices.length
    : 0;

  const unit =
    data.unit === "kg"
      ? "কেজি"
      : data.unit === "liter"
        ? "লিটার"
        : data.unit === "dozen"
          ? "ডজন"
          : "পিস";

  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#26332b]">
      <div className="mx-auto container">
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <span>হোম</span>
          <span>›</span>
          <span>{data.categoryNameBn}</span>
          <span>›</span>
          <span>{data.nameBn}</span>
        </div>

        <div className="mb-4 shadow-sm flex flex-col items-center justify-between gap-5 rounded-2xl border border-gray-200 bg-[#fbfdfb] p-5 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {data.image}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{data.nameBn}</h1>
              <p className="text-sm text-gray-500">
                প্রতি {unit} · {data.categoryNameBn}
              </p>
              <div>
                {data.change.dir === "up" ? (
                  <p>
                    গতকালের তুলনায় আজ দাম বেড়েছে {data.today - data.yesterday}{" "}
                    টাকা
                  </p>
                ) : data.change.dir === "down" ? (
                  <p>
                    গতকালের তুলনায় আজ দাম কমেছে {data.yesterday - data.today}{" "}
                    টাকা
                  </p>
                ) : (
                  <p>আজকে দামের পরিবর্তন হয়নি।</p>
                )}
              </div>
            </div>
          </div>

          <div className="min-w-32 rounded-xl bg-[#f0f5f0] px-5 py-3 text-center">
            <p className="text-xs text-gray-500">বর্তমান দাম</p>
            <p className="text-2xl font-bold">{formatNumber(data.today)}</p>
            <p className="text-xs text-gray-500">টাকা / {unit}</p>
            <p
              className={`mt-1 text-xs font-semibold ${
                data.change.dir === "up"
                  ? "text-red-500"
                  : data.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {data.change.dir === "up"
                ? "▲"
                : data.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatNumber(Math.abs(data.change.pct))}%
            </p>
          </div>
        </div>

        <div className="mb-4 shadow-sm rounded-2xl border border-gray-200 bg-[#fbfdfb] p-4">
          <h2 className="mb-3 font-semibold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-green-600">
                {formatNumber(minPrice)} টাকা
              </p>
              <p className="text-xs text-gray-500">বাজারের সর্বনিম্ন দাম</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold text-red-500">
                {formatNumber(maxPrice)} টাকা
              </p>
              <p className="text-xs text-gray-500">বাজারের সর্বোচ্চ দাম</p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="text-xl font-bold text-green-600">
                {formatNumber(Math.round(averagePrice))} টাকা
              </p>
              <p className="text-xs text-gray-500">
                সব বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl shadow-sm border border-gray-200 bg-[#fbfdfb] p-4">
          <h2 className="mb-4 font-semibold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-300">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#f8fbf8] text-left text-gray-500">
                  <th className="px-3 py-3 font-medium">বাজার</th>
                  <th className="px-3 py-3 font-medium">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-gray-200 ${
                      index % 2 === 0 ? "bg-[#fbfdfb]" : "bg-[#f0f5f0]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatNumber(market.min)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right">
                      {formatNumber(market.max)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                      {formatNumber(Math.round((market.min + market.max) / 2))}{" "}
                      টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParamsPage = ({ params }: ParamsPageProps) => {
  return (
    <Suspense fallback={<p>পণ্যের তথ্য লোড হচ্ছে...</p>}>
      <ProductContent params={params} />
    </Suspense>
  );
};

export default ParamsPage;
