import React from 'react';
import Marquee from "react-fast-marquee";


const toBn = (num) => {
    if (num === undefined || num === null) return '';
    return Number(num).toLocaleString('bn-BD');
};

const Marque = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products');
    const data = await res.json();

    return (
        <div className="bg-white border-b border-gray-100 py-2.5">
            <Marquee direction='left' speed={100} pauseOnHover={true}>
                {
                    data.map((h, i) => {
                        const isUp = h.change?.dir === 'up';
                        const isDown = h.change?.dir === 'down';
                        const pct = h.change?.pct;

                        return (
                            <div key={i} className="flex items-center text-sm px-3 whitespace-nowrap">
                                {/* Image / Icon */}
                                <span className="text-base mr-1.5">{h.image}</span>

                                {/* Product Name */}
                                <span className="font-semibold text-gray-800 mr-2">
                                    {h.nameBn}
                                </span>

                                {/* Today's Price */}
                                <span className="text-gray-700 mr-2">
                                    {toBn(h.today)} টাকা/{h.unit === 'kg' ? 'কেজি' : h.unit}
                                </span>

                                {/* Price UP -> Green Color & ▲ Arrow */}
                                {isUp && (
                                    <span className="text-green-600 font-semibold flex items-center gap-0.5 mr-2">
                                        ▲ {toBn(pct)}%
                                    </span>
                                )}

                                {/* Price DOWN -> Red Color & ▼ Arrow */}
                                {isDown && (
                                    <span className="text-red-600 font-semibold flex items-center gap-0.5 mr-2">
                                        ▼ {toBn(pct)}%
                                    </span>
                                )}

                                {/* Dot Separator */}
                                <span className="text-gray-300 text-xs mx-2">
                                    •
                                </span>
                            </div>
                        );
                    })
                }
            </Marquee>
        </div>
    );
};

export default Marque;