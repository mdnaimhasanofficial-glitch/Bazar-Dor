import React from 'react';

const ProductDetails = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products?category=chal');
    const data = await res.json();
    console.log(data)
    return (
        <div>
            <h3>Product details</h3>
        </div>
    );
};

export default ProductDetails;