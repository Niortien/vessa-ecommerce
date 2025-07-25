import Image from 'next/image';
import React from 'react';
import img1 from '../../public/Assets/images/67b31b762a376ea5d303d9c8_value-image.jpg';

import { Button } from '../ui/button';
const Brand = () => {
   
    return (
        <div className="flex sm:flex-row-reverse flex-col-reverse md:flex-row items-center justify-between gap-4 p-4">

            {/* part left */}


             <div className="flex flex-col items-end sm:w-[50%] justify-center gap-4 p-4 ">
    
                <Image src={img1}  alt='image_1' />


            </div>
           


            {/* part right */}
             <div className="flex flex-col items-center h-[355px]  sm:w-[50%] sm:  gap-4 p-4  " >
                <div className="flex flex-col items-center justify-center gap-10">
<h1 className="text-3xl  w-[100%]  font-light">A brand built on values that matter</h1>
                <p>Our commitment to quality, sustainability, and innovation forms the foundation of everything we create. At Vessa, we believe in empowering individuals through thoughtful design, ethical practices, and timeless style. <br />

Every product reflects our dedication to making a positive impact, both in fashion and in the world</p>
                </div>

                <div className="flex flex-col items-start  w-[100%]  justify-end gap-4">
                    <Button>Explore collection</Button>
                </div>

                



            </div>
           
        </div>
    );
}

export default Brand;
