"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Casestudies2 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-6 text-center">
          <p className="font-medium">10,000+ Clients satisfaits</p>
          <h2 className="text-4xl font-medium md:text-5xl">
            Des résultats concrets pour nos clients
          </h2>
        </div>
        <div className="mt-20">
          <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
            <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
              <Image
                    src="/Assets/images/67b6f969e495504ab73e10c1_product-thumb-03.png"
                    alt="logo"
                   className="object-contain"
                    height={400}
                    width={200}
                    
                  />
              <div className="flex h-full flex-col justify-between gap-10">
                <q className="sm:text-xl">
                  J’ai trouvé tous les produits que je cherchais en quelques clics. Livraison rapide
                  et service client au top. Je recommande vivement cette boutique en ligne.
                </q>
                <div className="flex items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-primary">
                      Aïssata Koné
                    </p>
                    <p className="text-muted-foreground">Cliente fidèle</p>
                  </div>
                  <Image
                    src="/Assets/images/67b2d59ed03055e32fc1ce56_review-thumb-05.jpg"
                    alt="logo"
                   className="object-contain"
                    height={400}
                    width={200}
                    
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-10 self-center lg:flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  €450K
                </p>
                <p className="font-semibold text-primary">
                  Chiffre d&apos;affaires mensuel
                </p>
                <p className="text-muted-foreground">
                  sur les 30 derniers jours
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  15K+
                </p>
                <p className="font-semibold text-primary">
                  Commandes livrées
                </p>
                <p className="text-muted-foreground">
                  avec un taux de retour &lt; 2%
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-20" />
          <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
            <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
              <Image
                    src="/Assets/images/Modèle de carte de fidélité élégant avec un style d'or _ Vecteur Gratuite.jpeg"
                    alt="logo"
                   className="object-contain"
                    height={400}
                    width={200}
                    
                  />
              <div className="flex h-full flex-col justify-between gap-10">
                <q className="sm:text-xl">
                  Grâce à leur programme de fidélité, j&apos;ai économisé sur chaque commande.
                  Le site est fluide, les paiements sécurisés, et le suivi parfait.
                </q>
                <div className="flex items-end gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-primary">
                      Julien Moreau
                    </p>
                    <p className="text-muted-foreground">Client VIP</p>
                  </div>
                  <Image
                    src="/Assets/images/67b2d59e3b5d0e3d0c99d685_review-thumb-01.jpg"
                    alt="logo"
                   className="object-contain"
                    height={400}
                    width={200}
                    
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-10 self-center lg:flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  4.8/5
                </p>
                <p className="font-semibold text-primary">
                  Note moyenne client
                </p>
                <p className="text-muted-foreground">
                  sur plus de 3 000 avis vérifiés
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-medium text-primary sm:text-5xl">
                  98%
                </p>
                <p className="font-semibold text-primary">
                  Taux de satisfaction
                </p>
                <p className="text-muted-foreground">
                  au cours des 3 derniers mois
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Casestudies2 };
