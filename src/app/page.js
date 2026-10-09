
import { Suspense } from "react";
import Banner from "./banner/page";
import HighPrice from "./components/HighPrice";
import Marque from "./components/Marque";
import LowPrice from "./components/LowPrice";
import AllProduct from "./components/AllProduct";

export default function Home() {
  return (
  <div>
    <Suspense>
      <Marque/>
      <Banner/>
      <HighPrice/>
      <LowPrice/>
      <AllProduct/>
    </Suspense>
  </div>
  );
}
