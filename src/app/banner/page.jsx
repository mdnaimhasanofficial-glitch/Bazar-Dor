
import Image from "next/image";
import Link from "next/link";

const date = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

const Banner = () => {
  return (
    <section className="mx-auto container px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-green-100 bg-[#f8fcf8] px-6 py-10 shadow-sm sm:px-10 md:flex-row md:px-12 md:py-12">

        {/* Left Content */}
        <div className="w-full md:w-3/5">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
            {date}
          </span>

          <div className="mt-5">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
              এবং দামের পরিবর্তন এক জায়গায়।
            </p>
          </div>

          <div className="mt-7">
            <Link href={'./all-product'}><button className="btn border-0 bg-[#0f8b4d] px-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-green-700">
              সব পণ্য দেখুন
              <span aria-hidden="true">→</span>
            </button></Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex w-full items-center justify-center md:w-2/5">
          <Image
            src="/bazar-hero.png"
            alt="তাজা সবজির ঝুড়ি"
            width={400}
            height={300}
            priority
            className="h-auto w-full max-w-[320px] object-contain sm:max-w-90"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;
