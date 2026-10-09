import React from "react";
import Link from "next/link";
import Image from "next/image";

// বাংলা সংখ্যায় রূপান্তর করার ফাংশন
const toBn = (num) => {
  if (num === undefined || num === null || isNaN(num)) return "০";
  return Number(num).toLocaleString("bn-BD");
};

export default async function DetailsPage({ params }) {
  const { detailsId } = await params;

  // প্রোডাক্ট ডিটেইলস API কল[cite: 7]
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${detailsId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        পণ্যটির বিবরণ খুঁজে পাওয়া যায়নি!
      </div>
    );
  }

  const data = await res.json();


  const diff = (data.today || 0) - (data.yesterday || 0);
  const isUp = data.change?.dir === "up";
  const isDown = data.change?.dir === "down";
  const pct = data.change?.pct ?? 0;

  const markets = data.markets || [];
  const minPrices = markets.map((m) => m.min).filter(Boolean);
  const maxPrices = markets.map((m) => m.max).filter(Boolean);

  const overallMin = minPrices.length ? Math.min(...minPrices) : data.today;
  const overallMax = maxPrices.length ? Math.max(...maxPrices) : data.today;

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-6 px-4 md:px-8">
      <div className="container mx-auto space-y-6">

        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>›</span>
          <Link href={`/category/${data.category}`} className="hover:underline">
            {data.categoryNameBn || data.category}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">
            {data.nameBn || data.name}
          </span>
        </nav>


        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              {data.image &&
              (data.image.startsWith("http") || data.image.startsWith("/")) ? (
                <Image
                  src={data.image}
                  alt={data.nameBn || data.name}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <span className="text-3xl">{data.image || "🛒"}</span>
              )}
            </div>


            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data.nameBn || data.name}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                প্রতি {data.unit || "কেজি"} •{" "}
                {data.categoryNameBn || data.category}
              </p>


              <p className="text-xs text-gray-500 mt-2">
                {isUp &&
                  `গতকালকের তুলনায় আজ দাম বেড়েছে ${toBn(Math.abs(diff))} টাকা`}
                {isDown &&
                  `গতকালকের তুলনায় আজ দাম কমেছে ${toBn(Math.abs(diff))} টাকা`}
                {!isUp && !isDown && "গতকালকের তুলনায় আজ দাম অপরিবর্তিত রয়েছে"}
              </p>
            </div>
          </div>

          {/* ডানপাশের আজকের দামের বক্স */}
          <div className="bg-[#f7f9f7] border border-gray-100 rounded-xl p-4 text-center min-w-40 self-start md:self-auto">
            <span className="text-xs text-gray-400 block mb-1">আজকের দাম</span>
            <div className="text-3xl font-extrabold text-gray-900">
              {toBn(data.today)}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              টাকা / {data.unit || "কেজি"}
            </div>

            {/* পার্সেন্টেজ ব্যাজ */}
            <div className="mt-2 flex items-center justify-center">
              {isUp && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full">
                  ▲ {toBn(pct)}%
                </span>
              )}
              {isDown && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  ▼ {toBn(pct)}%
                </span>
              )}
              {!isUp && !isDown && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  — {toBn(pct)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ৩. দামের সারসংক্ষেপ (Price Summary Stats Cards) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* সর্বনিম্ন দাম */}
            <div className="bg-[#fcfdfc] border border-gray-100 rounded-xl p-4">
              <span className="text-xs text-gray-400 block mb-1">
                সর্বনিম্ন দাম
              </span>
              <div className="text-xl font-bold text-emerald-600">
                {toBn(overallMin)} টাকা
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">
                সবচেয়ে কম দামের বাজার
              </span>
            </div>

            {/* সর্বাধিক দাম */}
            <div className="bg-[#fcfdfc] border border-gray-100 rounded-xl p-4">
              <span className="text-xs text-gray-400 block mb-1">
                সর্বাধিক দাম
              </span>
              <div className="text-xl font-bold text-red-500">
                {toBn(overallMax)} টাকা
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">
                সবচেয়ে বেশি দামের বাজার
              </span>
            </div>

            {/* গড় দাম */}
            <div className="bg-[#fcfdfc] border border-gray-100 rounded-xl p-4">
              <span className="text-xs text-gray-400 block mb-1">গড় দাম</span>
              <div className="text-xl font-bold text-emerald-600">
                {toBn(data.today)} টাকা
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">
                প্রতি {data.unit || "কেজি"}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        {/* ৪. বাজারভিত্তিক আজকের দাম (Market Table) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400 font-normal">
                  <th className="py-3 px-2 font-normal">বাজার</th>
                  <th className="py-3 px-2 font-normal">বিভাগ</th>
                  <th className="py-3 px-2 font-normal">সর্বনিম্ন</th>
                  <th className="py-3 px-2 font-normal">সর্বাধিক</th>
                  <th className="py-3 px-2 font-normal text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m, index) => {
                  const avg = ((m.min + m.max) / 2).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-2 font-semibold text-gray-800">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-2 text-gray-500">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-2 font-medium text-gray-700">
                        {toBn(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-2 font-medium text-gray-700">
                        {toBn(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-2 font-bold text-gray-900 text-right">
                        {toBn(avg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
