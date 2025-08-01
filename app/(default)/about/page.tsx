import { Banner } from '@/components/about/Banner';
import Brand from '@/components/about/Brand';
import Experience from '@/components/about/Experience';
import Inspiration from '@/components/about/Inspiration';
import { Casestudies2 } from '@/components/casestudies2';
import { Issa } from '@/components/home/Issa';

import { Stats8 } from '@/components/stats8';

import React from 'react';

const Page = () => {
    return (
        <div>
            <Experience/>
           <Banner />
           <Inspiration />
           <Brand/>
           <Stats8/>
           <Casestudies2></Casestudies2>
           <Issa />
            
        </div>
    );
}

export default Page;
