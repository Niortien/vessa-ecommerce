import React from 'react';
import CollectionCard from '../ui/CollectionCard';
import { categories } from '@/Data/categories';
const Collection = () => {


  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-4xl font-bold mb-10 sm:mb-16 text-gray-900">Our Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <div key={category.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <CollectionCard id={category.id}
              title={category.title}  // Corrected property name
              image={category.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
