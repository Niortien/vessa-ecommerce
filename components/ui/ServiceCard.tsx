import { Service } from '@/type/service';

import {  ClockArrowUp, Package, ShoppingBag, Truck } from 'lucide-react';

import React from 'react';

const ServiceCard = ({id,name,description}:Service) => {
    return (
        <div className='py-3'>
            <h1 className='flex  items-center gap-2 text-xl'> {id === 1 ?   <Package size={40} />: id === 2 ? <Truck size={40} />: id==3 ? <ShoppingBag size={40} />: <ClockArrowUp size={40} />} {name} </h1>
            <p> {description} </p>
            
           
        </div>
    );
}

export default ServiceCard;
