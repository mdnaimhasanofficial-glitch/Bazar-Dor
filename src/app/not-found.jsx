import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8 text-center border border-gray-100 dark:border-zinc-800">
                
                {/* 404 Number / Icon Accent */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-3xl font-bold mb-6 shadow-inner">
                    ৪০৪
                </div>

                {/* Heading & Description */}
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    পেজটি পাওয়া যায়নি!
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    দুঃখিত, আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানা ভুল রয়েছে।
                </p>

                {/* Back to Home Button */}
                <Link 
                    href="/" 
                    className="inline-block w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-sm transition-all text-center"
                >
                    হোম পেজে ফিরে যান
                </Link>

            </div>
        </div>
    );
};

export default NotFound;