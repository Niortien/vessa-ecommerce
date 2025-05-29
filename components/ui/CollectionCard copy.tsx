import Image from 'next/image';
import React from 'react';

export interface Category {
    id: number;
    title: string;
    image: string;
}
const CollectionCard = ({id,title,image  }:Category) => {
    return (
        <div>
             <div key={id}>
              <div className="h-80 sm:h-72 md:h-64 lg:h-80 w-full relative">
                <Image
                  src={image}
                  alt={`${title} collection`}
                  
                  className="object-cover w-full h-full rounded-lg transition-transform duration-300 transform group-hover:scale-105"
                  height={200} width={200}/>
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 bg-white py-2 px-6 rounded-md shadow-sm">
                  <h3 className="text-gray-900 font-medium text-lg">{title}</h3>
                </div>
              </div>
            </div>
        </div>
    );
}

export default CollectionCard;
