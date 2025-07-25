import Image from 'next/image';
import React from 'react';
import img1 from '../../public/Assets/images/67b2e0016283c3157e744794_about-image.jpg';
import img2 from '../../public/Assets/images/67b3175693ac7d65f338b3b0_about-mini.jpg';
import { Button } from '../ui/button';
import { ArrowUpRight } from 'lucide-react';
const Experience = () => {
    const heading = "Our story"
     const demoUrl="About us"
    return (
        
       <div>
         <div>
           
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-Xm font-medium md:text-base lg:text-lg"
            >
              Book a demo
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
             <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h2>
          </div>
         <div className="flex sm:flex-row flex-col-reverse md:flex-row items-center justify-between gap-4 p-4">

            {/* part left */}
            


             <div className="flex flex-col items-end sm:w-[50%] justify-center gap-4 p-4">
                <Image src={img1}  alt='image_1' />

            </div>
           


            {/* part right */}
             <div className="flex flex-col items-center h-[555px]  sm:w-[50%] sm:  gap-4 p-4">
                <div className="flex flex-col items-center justify-center gap-10">
<h1 className="text-3xl font-light">Redefining fashion for a modern world with elegance & ethical practices</h1>
                <p>At Vessa, we redefine modern fashion with timeless designs that celebrate individuality and elegance. Founded with a passion for creating stylish, high-quality clothing, 
                we aim to empower every individual to express themselves through fashion.</p>
                </div>

                <div className="flex flex-col items-start  w-[100%]  justify-end gap-4">
                    <Button> Explore collection</Button>
                </div>

                <div className="flex flex-col items-start justify-start gap-4 w-[100%] relative sm:h-56 h-52   p-1">
  <Image src={img2}  alt='image_1' className='w-full h-full object-fill sm:ml-0' />
                </div>



            </div>
           
        </div>
       </div>
    );
}

export default Experience;
