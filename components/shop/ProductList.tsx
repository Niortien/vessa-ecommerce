import React from 'react';
import Product from './Product';
import { products } from '@/Data/product';

const ProductList = () => {
    return (
        <div>
            <h1 className='sm:text-5xl sm:font-bold text-3xl font-bold' >Latest Products</h1>
            <div className=' grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                {products.map((items) => (
                    <div key={items.id}>
                        <Product
                            id={items.id}
                            name={items.name}
                            price={items.price}
                            imgPath={items.imgPath}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
