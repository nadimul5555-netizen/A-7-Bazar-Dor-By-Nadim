import { Suspense } from "react";
import { CategoryType, ParamsType, PonnoType } from "@/app/AllTypes";
import Link from "next/link";
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
    <div className="container mx-auto">
      <div className="group my-10 flex rounded-2xl border border-gray-200 bg-[#fbfdfb] p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md">
        <span className="m-5 text-3xl">
          {Data.find((cat: CategoryType) => cat.id === id)?.icon ?? ""}
        </span>

        <div>
          <h1 className="m-2 text-3xl font-bold">
            {Data.find((cat: CategoryType) => cat.id === id)?.nameBn ?? ""}
          </h1>

          <p className="text-gray-500">
            {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
    <div>
      <Suspense fallback={ <p>Loading...</p>}>

      <SortingPage data={data}/>
      </Suspense>
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