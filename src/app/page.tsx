import Image from "next/image";
import HeroPage from "./components/Hero";
import PriceHigh from "./components/PriceHigh";
import PriceLowPage from "./components/PriceLow";
import EveryProduct from "./components/EveryProduct";


const Home = async () => {
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
    <>
      <HeroPage />
    
        <PriceHigh data={data}></PriceHigh>
        <PriceLowPage data={data}></PriceLowPage>
        <EveryProduct data={data}></EveryProduct>
      </>
    
  );
};

export default Home;