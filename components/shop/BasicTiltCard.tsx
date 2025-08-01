"use client";
import { Tilt } from "@/components/ui/tilt";

import Image from "next/image";

import { useRouter } from "next/navigation";

interface ArticleProps{
  id:string
  nom:string
  image?:string
  prix:number
}
function BasicTiltCard({ id, nom, image, prix }: ArticleProps) {
   const router = useRouter();
  const handleClick = () => {
    router.push(`/shop/${id}`);
  };
  return (
    <Tilt rotationFactor={8} isRevese className="border"  >
      <div 
      onClick={handleClick}
        key={id}
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border cursor-pointer border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
      <div className="relative h-52 w-full overflow-hidden">
         <Image
                   src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
                   alt={`product-${id}`}
                   height={600}
                   width={200}
                   className='h-48 w-full rounded-lg object-contain  duration-900  '
                   loading="lazy"
                 />
      </div>
        <div className='p-2'>
          <h1 className='font-mono leading-snug text-zinc-950 dark:text-zinc-50'>
           {nom}
          </h1>
          <p className='text-zinc-700 dark:text-zinc-400'> {prix} </p>
        </div>
      </div>
    </Tilt>
  );
}



export { BasicTiltCard, };