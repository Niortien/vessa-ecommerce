import Image from 'next/image';
import React from 'react';
import logo from '@/public/Assets/images/67b03a0fcc056d21a6fdedca_mission.jpg';
import { Button } from './button';

const Mission = () => {
    return (
        <div className='flex sm:flex-row sm:gap-15 flex-col sm:px-10 py-14 '>
             <div className='h-[560px] sm:h-72 md:h-64 lg:h-80 border-2 w-full sm:w-96   relative'>
                <Image src={logo} alt='zi' className='w-full h-full object-cover absolute' fill />
            </div>
            <div className='flex sm:flex-col  flex-col gap-10 sm:w-[70%] px-1 pt-20 sm:pt-0 '>
        <h1 className='text-3xl' >
        Our mission is to empower individuals to express their unique style confidently through curated collections.
        </h1>
        <p className='text-lg'>
        From everyday essentials to standout statement pieces, each item is thoughtfully designed to ensure quality, comfort, and elegance. We take pride in crafting clothing that complements every aspect of your lifestyle, whether  dressing for work, play, or special occasions.

Sustainability drive us forward. We are committed to responsible practices that respect both people and the planet while delivering fashion that feels as good as it looks.
        </p>
        <Button className='w-44 ring-1 ring-black text-black bg-white'>About us</Button>
            </div>
        </div>
    );
}

export default Mission;
