import React from 'react';
import CollectionCard from '../ui/CollectionCard';
import { categories } from '@/Data/categories';

const Collection = () => {
  // Add error handling to check if categories data exists
  if (!categories || categories.length === 0) {
    console.error('Categories data is missing or empty');
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-10 sm:mb-16 text-gray-900">Our Collection</h2>
        <p>No categories found. Please check your data source.</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <h2 className="text-4xl font-bold mb-10 sm:mb-16 text-gray-900">Our Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <CollectionCard 
            key={category.id}
            id={category.id}
            title={category.title}
            image={category.image} 
          />
        ))}
      </div>
    </section>
  );
};

export default Collection;