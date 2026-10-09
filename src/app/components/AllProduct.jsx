import React from 'react';

// সংখ্যাকে বাংলায় রূপান্তর করার ইউটিলিটি ফাংশন
const toBn = (num) => {
  if (num === undefined || num === null || isNaN(num)) return '০';
  return Number(num).toLocaleString('bn-BD');
};

const AllProduct = async () => {
  const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products', {
    cache: 'no-store',
  });
  const allProduct = await res.json();

  return (
    <section className="p-6 container mx-auto min-h-screen">
      {/* সেকশন হেডার */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mt-1">
          মোট {toBn(allProduct.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allProduct.map((product) => {
          const isUp = product.change?.dir === 'up';
          const isDown = product.change?.dir === 'down';
          const pct = product.change?.pct ?? 0;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* উপরের অংশ: ইমেজ ও প্রোডাক্ট নেম/ইউনিট */}
              <div className="flex items-center gap-3">
                {/* ইমেজ কন্টেইনার */}
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                  {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                    <span className="text-base mr-1.5">{h.image}</span>
                  ) : (
                    <span className="text-2xl">{product.image || '🛒'}</span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug">
                    {product.nameBn || product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    প্রতি {product.unit || 'কেজি'}
                  </p>
                </div>
              </div>

              {/* নিচের অংশ: দাম এবং পরিবর্তন (Badge) */}
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

                {/* দাম বৃদ্ধি/হ্রাস/অপরিবর্তিত ব্যাজ */}
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
    </section>
  );
};

export default AllProduct;