import { Button } from "@/components/ui/button";
import Link from "next/link";

const Stats6 = () => {
  return (
    <section className="bg-accent py-32 ">
      <div className="container flex flex-col items-center text-center ">
        <div className="mb-12 w-full md:mb-16 text-center border-2  border-amber-300">
          <h2 className="mb-8 w-full border-2 border-blue-300 max-w-[24rem] text-3xl font-bold text-pretty text-center sm:text-4xl md:max-w-[30rem] lg:max-w-[37rem] lg:text-5xl">
            Platform Performance Insights
          </h2>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Link href="/shop" className="w-full sm:w-auto">Get Started</Link>
            <Button variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-12 sm:w-fit sm:grid-cols-4 lg:gap-16">
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              90%
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Taux de Conversion
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              200+
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Produits
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              99%
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              de  Satisfaction
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              150000+
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats6 };
