import { Suspense } from "react";
import Banner from "./banner/page";
import HighPrice from "./components/HighPrice";
import Marque from "./components/Marque";
import LowPrice from "./components/LowPrice";
import AllProduct from "./components/AllProduct";
import Loading from "./loading";

// লোডিং স্কেলিটন বা লোডার কম্পোনেন্ট (Optional)
const ComponentLoader = () => (
  <div className="p-4 text-center text-gray-500">লোড হচ্ছে...</div>
);

export default function Home() {
  return (
    <main className="space-y-6">
      <Suspense fallback={<Loading />}>
        <Marque />
      </Suspense>

      <Banner />

      <Suspense fallback={<Loading />}>
        <HighPrice />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <LowPrice />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <AllProduct />
      </Suspense>
    </main>
  );
}