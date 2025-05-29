"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Issa = ({
  heading = "Happy Customers",
  demoUrl = "https://www.shadcnblocks.com",
  items = [
  {
    id: "item-1",
    title: "Brooklyn Simmons",
    summary:
      "“Produit conforme à la description, livraison rapide. Très satisfait de mon achat !”",
    url: "#",
    image: "/Assets/images/67b2d59e3b5d0e3d0c99d685_review-thumb-01.jpg",
  },
  {
    id: "item-2",
    title: "Computer Vision Technology",
    summary:
      "“Excellent rapport qualité/prix. Le produit fonctionne parfaitement depuis plusieurs semaines.”",
    url: "#",
    image: "/Assets/images/67b2d59e0d50d9e0f653fba3_review-thumb-04.jpg",
  },
  {
    id: "item-3",
    title: "Brooklyn Simmons",
    summary:
      "“Très bon service client, j’ai reçu une réponse rapide à ma question. Je recommande !”",
    url: "#",
    image: "/Assets/images/67b2d59e033002d5b0c5b72f_review-thumb-03.jpg",
  },
  {
    id: "item-4",
    title: "Predictive Analytics",
    summary:
      "“Produit de qualité, bien emballé. Je l'utilise tous les jours sans problème.”",
    url: "#",
    image: "/Assets/images/67b2d59ea95fbdb1a58b4e77_review-thumb-06.jpg",
  },
  {
    id: "item-5",
    title: "Neural Network Architecture",
    summary:
      "“Parfait, exactement ce que je cherchais. Livraison dans les délais. Merci !”",
    url: "#",
    image: "/Assets/images/67b029616d40c60acab87ac4_categories-04.jpg",
  }
]
,
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
           
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            >
              Book a demo
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
             <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 md:max-w-[452px] ">
                
                  <a
                                  href={item.url}
                                  className="group flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                                      <div className="flex-1">
                                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                                          <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                            height={300}
                                            width={300}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                                    {item.title}
                                  </div>
                                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                                    {item.summary}
                                  </div>
                                
                                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Issa };
