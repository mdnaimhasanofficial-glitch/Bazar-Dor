
import { GiShoppingCart } from 'react-icons';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className="navbar">
                <div className="nav-icon">
                    <Link href="/"><GiShoppingCart /></Link>
                    <h2> আমার নাম নাইম হাসান </h2>
                </div>
            </div>
        </div>
    );
};

export default Navbar;