import { product } from '@/type/product';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Product = ({id,name,imgPath,price}:product) => {
    return (
        <Link href='#'>
        <div key={id} className=' cursor-pointer'>
            <div className='border-1 relative bg-gray-200'>
        <Image src={imgPath} alt={`product-${id}`} height={200} width={200} className='w-full h-full ' />
            </div>
            <div>
                <h3> {name} </h3>
                <h3> ${price}.00 </h3>

            </div>
        </div></Link>
    );
}

export default Product;
