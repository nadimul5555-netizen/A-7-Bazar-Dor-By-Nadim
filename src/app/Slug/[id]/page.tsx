import { Suspense } from "react";
import { CategoryType, ParamsType, PonnoType } from "@/app/AllTypes";
import SortingPage from "@/app/components/Sorting";

type ParamsPageProps = {
  params: Promise<ParamsType>;
};

const ProductContent = async ({ params }: ParamsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(id)}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data: PonnoType[] = await res.json();

  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const Data: CategoryType[] = await response.json();

  return (
    <div className="container mx-auto px-3 sm:px-5 md:px-6">
      <div className="group my-6 flex flex-col gap-2 rounded-2xl border border-gray-200 bg-[#fbfdfb] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md sm:my-8 sm:flex-row sm:items-center sm:gap-3 sm:p-5 md:my-10">
        <span className="text-3xl sm:m-3 sm:text-4xl md:m-5">
          {Data.find((cat: CategoryType) => cat.id === id)?.icon ?? ""}
        </span>

        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            {Data.find((cat: CategoryType) => cat.id === id)?.nameBn ?? ""}
          </h1>

          <p className="text-sm text-gray-500 sm:text-base">
            {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <div className="min-w-0">
        <Suspense fallback={<p className="py-5 text-center text-sm text-gray-500">Loading...</p>}>
          <SortingPage data={data} />
        </Suspense>
      </div>
    </div>
  );
};

const ParamsPage = ({ params }: ParamsPageProps) => {
  return (
    <Suspense fallback={<p className="px-3 py-5 text-center text-sm text-gray-500 sm:px-5">পণ্যের তথ্য লোড হচ্ছে...</p>}>
      <ProductContent params={params} />
    </Suspense>
  );
};

export default ParamsPage;
