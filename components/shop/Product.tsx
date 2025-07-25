import { product } from '@/type/product';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Product = ({ id, title, image, price }: product) => {
  return (
    <Link href="#">
      <div key={id} className="cursor-pointer">
        <div className="relative bg-gray-200 border">
          <Image
            src={image}
            alt={`product-${id}`}
            height={200}
            width={200}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <div>
          <h3>{title}</h3>
          <h3>${price}.00</h3>
        </div>
      </div>
    </Link>
  );
};

export default Product;
