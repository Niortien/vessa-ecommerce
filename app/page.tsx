import Hero from '@/components/home/Hero';

import Collection from '@/components/home/Collection';
import Service from '@/components/service/Service';
import Mission from '@/components/ui/Mission';
import BlogsSection from '@/components/home/BlogsSection';
import Bonus from '@/components/ui/Bonus';
import ProductList from '@/components/shop/ProductList';

import { Issa } from '@/components/home/Issa';





export default function Home() {
  return (
    <div className="">
     

    <Hero></Hero>
    <Collection></Collection>
    <Service></Service>
   

    <Mission />
      
    
     <ProductList />
  
    
   
    <Bonus/> 

    <BlogsSection/>
    <Issa />
  
    
    </div>
  );
}
