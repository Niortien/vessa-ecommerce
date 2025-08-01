"use client";

import React, { useState } from "react";
import { Star, Package, Ruler } from "lucide-react";
import Image from "next/image";
import { Article } from "@/type/type";
import { useFinc } from "@/Store/Store";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Content({ product }: { product: Article }) {
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useFinc();
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      toast.error("Vous devez être connecté pour ajouter un article au panier !");
      router.push("/login");
      return;
    }
    addToCart(product);
    toast.success(`L'article ${product.nom} a été ajouté au panier !`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    stars.push(<Star key={4} className="w-4 h-4 text-gray-400" />);
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-300 to-white-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Côté gauche - Image du produit */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 md:p-8 relative">
              <div className="absolute top-4 left-4">
                <span className="bg-white px-3 py-1 rounded-full text-xs md:text-sm text-gray-600 font-medium">
                  {product.reference}
                </span>
              </div>

              <div className="flex items-center justify-center h-64 md:h-80 lg:h-96">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${product.image}`}
                  alt={product.nom}
                  width={600}
                  height={600}
                  className="object-contain max-h-full max-w-full"
                />
              </div>

              {/* Variétés disponibles */}
              <div className="mt-6 p-4 rounded-xl bg-white border border-gray-300 shadow-md">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Variétés disponibles
                </h2>
                <div className="flex flex-wrap gap-4">
                  {product.varietes?.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center gap-3 bg-gray-50 p-4 rounded-lg border border-blue-200 shadow-sm w-[150px]"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
                        alt={item.couleur}
                        width={100}
                        height={100}
                        className="object-contain border border-amber-400 rounded-md"
                      />

                      <p className="text-sm font-semibold capitalize text-blue-800">
                        {item.couleur}
                      </p>

                      <div className="flex flex-wrap gap-1 justify-center">
                        {item.tailles?.map((tailleItem, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 text-xs text-blue-900 bg-blue-100 px-2 py-1 rounded-full"
                          >
                            <Ruler className="w-3 h-3" />
                            tailles : {tailleItem.taille}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Côté droit - Détails du produit */}
            <div className="w-full lg:w-1/2 bg-gray-800 text-white p-4 md:p-8">
              <div className="mb-2">
                <span className="text-yellow-400 text-xs md:text-sm font-medium uppercase tracking-wider">
                  {product.description}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {product.nom}
              </h1>
              <p className="text-gray-400 mb-4 italic text-sm md:text-base">
                {product.genre}
              </p>

              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl md:text-4xl font-bold">${product.prix}</span>
                <div className="flex items-center space-x-1">{renderStars()}</div>
              </div>

              {/* Onglets */}
              <div className="flex space-x-4 md:space-x-8 mb-6 border-b border-gray-700 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-2 text-xs md:text-sm font-medium whitespace-nowrap ${
                    activeTab === "description"
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  DESCRIPTION
                </button>
              </div>

              {/* Contenu de l'onglet actif */}
              <div className="mb-6 md:mb-8">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Bouton d'action */}
              <div className="space-y-3">
                <button
                  className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors text-sm md:text-base"
                  onClick={handleClick}
                >
                  AJOUTER AU PANIER
                </button>
              </div>

              {/* Infos spécifiques (taille, quantité) */}
              {product.infos?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md p-4 my-2 flex flex-col gap-2"
                >
                  <div className="flex items-center font-bold text-2xl gap-2 text-blue-100">
                    <Package className="w-5 h-5" />
                    <span>Quantité : {item.quantite}</span>
                  </div>
                  <div className="flex items-center font-bold text-2xl gap-2 text-blue-100">
                    <Ruler className="w-5 h-5" />
                    <span>Taille : {item.taille}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
