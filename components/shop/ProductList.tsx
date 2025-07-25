"use client"
import React from 'react';

import { BasicTiltCard } from './BasicTiltCard';
import { Article } from '@/type/type';





const ProductList = ({
  products,
 
}: {
  products: { data: Article[]; total: number; page: number; limit: number };
 
}) => {
    const [product, setProducts] = React.useState<Article[]>(products?.data ?? []);
;
  return (
    <div>
      <h1 className="sm:text-5xl sm:font-bold text-3xl font-bold">Latest Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {product?.map((product) => (
          <div key={product.id}>
            <BasicTiltCard
              id={product.id}
              nom={product.nom}
              prix={product.prix}
              image={product.image}
              
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
