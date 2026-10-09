import { Suspense } from "react";
import Banner from "./banner/page";
import HighPrice from "./components/HighPrice";
import Marque from "./components/Marque";
import LowPrice from "./components/LowPrice";

import Loading from "./loading";
import AllProduct from "./all-product/page";

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