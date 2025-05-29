import React from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import {service} from '@/Data/service';
import logo from '@/public/Assets/images/67b0332f67098fb5c4ef4b64_perk-image.jpg';
import Image from 'next/image';

const Service = () => {
    return (
        <div className='flex sm:flex-row flex-col justify-center items-center gap-10 p-5 px-10 py-28'>
            <div className='h-[560px] sm:h-72 md:h-64 lg:h-80 border-2 w-full sm:w-96   relative'>
                <Image src={logo} alt='zi' className='w-full h-full object-cover absolute' fill />
            </div>
            <div className=' grid grid-cols-2 sm:grid-cols-2 sm:grid-rows-2  gap-20 md:gap-6'>
                {service.map((item) => (
                    <div key={item.id} className='border-b border-gray-400 border-t' >
                        <ServiceCard
                            id={item.id}
                            name={item.name}
                            description={item.description}
                           
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Service;
