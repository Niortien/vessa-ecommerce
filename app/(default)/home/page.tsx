import Hero from '@/components/home/Hero';

import Collection from '@/components/home/Collection';
import Service from '@/components/service/Service';
import Mission from '@/components/ui/Mission';
import BlogsSection from '@/components/home/BlogsSection';
import Bonus from '@/components/ui/Bonus';


import { Issa } from '@/components/home/Issa';






export default function Home() {
  return (
    <div className="">
     

    <Hero/>
    <Collection></Collection>
    <Service></Service>
   

    <Mission />
      
    
     /
  
    {/* //TODO: revoir le composant ProductList pour qu'il prenne en compte les produits de la collection */}
   
    <Bonus/> 

    <BlogsSection/>
    <Issa />
  
  
    </div>
  );
}
