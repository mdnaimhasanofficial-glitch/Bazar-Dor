import Link from 'next/link';
import React from 'react';

export default async function HighPrice() {
  const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
    cache: 'no-store'
  });
  const data = await res.json();


  const highPriceProducts = data
    .filter((h) => h.change?.dir === 'up')
    .slice(0, 6);

  return (
    <section className="p-4 container mx-auto">
      {/* হেডার / সেকশন টাইটেল */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-500 font-bold text-lg">▲</span>
        <h2 className="text-xl font-bold text-gray-800">আজ দাম বেড়েছে</h2>
      </div>

      {/* প্রোডাক্ট গ্রিড (প্রথম ৬টি আইটেম) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {highPriceProducts.map((h, i) => {
          return (
            <Link href={`/productDetails/${h.id}`} key={i}>
                <div
              key={h.id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* উপরের অংশ: নাম, ইউনিট ও ছবি */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {h.nameBn || h.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    প্রতি {h.unit || 'কেজি'}
                  </p>
                </div>

                <div className="w-12 h-12 relative shrink-0">
                  <span className="text-base mr-1.5">{h.image}</span>
                </div>
              </div>

              {/* নিচের অংশ: দাম ও পার্সেন্টেজ */}
              <div className="flex items-end justify-between mt-6">
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">
                    আজকের দাম
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-gray-900">
                      {h.today}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      টাকা
                    </span>
                  </div>
                </div>

                {h.change?.pct !== undefined && (
                  <div className="flex items-center gap-1 bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <span>▲</span>
                    <span>{h.change.pct}%</span>
                  </div>
                )}
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

