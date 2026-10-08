import Link from 'next/link';
import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import NavLinks from './NavLinks';
const date = new Date().toLocaleDateString("bn-BD", {dateStyle: "full"});

const Navbar = () => {
    return (
        <header className="bg-white">
            {/* Top Section - Logo & Auth Buttons */}
            <div className="border-b border-gray-100">
                <div className='container mx-auto px-4'>
                    <div className="flex justify-between items-center py-4">
                        
                        {/* Logo & Text */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="bg-[#0f8b4d] text-white p-2.5 rounded-lg text-2xl flex items-center justify-center">
                                <MdShoppingCart />
                            </Link>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-bold text-gray-900 leading-tight">বাজার দর</h2>
                                <h3 className="text-xs text-gray-500 mt-0.5">{date}</h3>
                            </div>
                        </div>
                        
                        {/* Auth Buttons */}
                        <div className="flex items-center gap-5">
                            <button className="text-sm font-bold text-gray-800 hover:text-[#0f8b4d] transition-colors">
                                সাইন ইন
                            </button>
                            <button className="bg-[#0f8b4d] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">
                                সাইন আপ
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Bottom Section - Category Links */}
            <div className="container mx-auto px-4">
                <NavLinks />
            </div>
            
            {/* Bottom Border for the whole Navbar */}
            <div className="border-b border-gray-100"></div>
        </header>
    );
};

export default Navbar;