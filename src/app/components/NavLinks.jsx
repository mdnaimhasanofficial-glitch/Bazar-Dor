import Link from 'next/link';
import React from 'react';

const NavLinks = async() => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
    const data = await res.json();
    
    console.log(data)
    return (
        <div className='flex items-center gap-8 py-4 overflow-x-auto text-sm font-medium text-gray-700'>
            {
                data.map((n, i) => (
                    <Link 
                        key={i} 
                        href={`/${n.slug}`}
                        className="flex items-center gap-1.5 hover:text-[#0f8b4d] whitespace-nowrap transition-colors"
                    > 
                        <span className="text-base">{n.icon}</span> 
                        <span>{n.nameBn}</span>
                    </Link>
                ))
            }
        </div>
    );
};

export default NavLinks;