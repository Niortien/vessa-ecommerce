import Image from 'next/image';
import imag1 from  '@/public/Assets/images/hero.webp';
import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900 relative">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 bg-[#D9E2F3]">
                    <div className="mr-auto place-self-center lg:col-span-7 ">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">WEAR YOUR CONFIDENCE</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Discover a curated selection of timeless designs and modern trends crafted to elevate your wardrobe. From statement pieces to everyday essentials, find the perfect fit that defines your unique style.


</p>
                        <Link href="/shop" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Shop Now
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Speak to Sales
                        </a> 
                    </div>
                    <div className=" lg:mt-0 lg:col-span-5 lg:flex relative sm:bottom-[-63] bottom-[-33]">
                       <Image src={imag1} alt='coco' width={500} height={400}   />
                    </div>                
                </div>
            </section>
        </div>
    );
}

export default Hero;
