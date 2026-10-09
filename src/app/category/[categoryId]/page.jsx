import Image from "next/image";
import React from "react";

const toBn = (num) => {
  if (num === undefined || num === null || isNaN(num)) return "০";
  return Number(num).toLocaleString("bn-BD");
};

export default async function CategoryPage({ params }) {
  const { categoryId } = await params;

  // API call
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    {
        cache: "no-store",
    },
  );
  const data = await res.json();

  // Dynamic category title & icon from API response
  const categoryTitle = data[0]?.categoryNameBn || categoryId;
  const categoryIcon = data[0]?.categoryIcon || "🌾";

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Header Banner */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4 border border-gray-100">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-3xl shrink-0">
            {categoryIcon.startsWith("http") ? (
              <Image
                src={categoryIcon}
                alt={categoryTitle}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span>{categoryIcon}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {toBn(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* 2. Sort / Filter Bar */}
        <div className="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-center justify-end border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>সাজান</span>
            <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 outline-none focus:ring-1 focus:ring-emerald-500">
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* 3. Product Counter */}
        <p className="text-sm text-gray-500 px-1">
          মোট {toBn(data.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* 4. Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";
            const pct = product.change?.pct ?? 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Top Section: Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                    {product.image &&
                    (product.image.startsWith("http") ||
                      product.image.startsWith("/")) ? (
                      <Image
                        src={product.image}
                        alt={product.nameBn || product.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <span className="text-2xl">{product.image || "🛒"}</span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                      {product.nameBn || product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      প্রতি {product.unit || "কেজি"}
                    </p>
                  </div>
                </div>

                {/* Bottom Section: Price & Change Percentage */}
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">
                      আজকের দাম
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-gray-900">
                        {toBn(product.today)}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        টাকা
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  {isUp && (
                    <div className="flex items-center gap-1 bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <span>▲</span>
                      <span>{toBn(pct)}%</span>
                    </div>
                  )}

                  {isDown && (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <span>▼</span>
                      <span>{toBn(pct)}%</span>
                    </div>
                  )}

                  {!isUp && !isDown && (
                    <div className="flex items-center gap-1 bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <span>—</span>
                      <span>{toBn(pct)}%</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
