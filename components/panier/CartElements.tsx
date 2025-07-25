"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFinc } from "@/Store/Store";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type ArticleProps = {
  id: string;
  nom: string;
  image: string;
  prix: number;
  reference: string;
  description?: string;
};

const CartElements = ({ id, nom, image, prix }: ArticleProps) => {
  const [qty, setQty] = useState(1);
  const { deleteToCart } = useFinc();
  const router = useRouter();

  const setQuantity = (value: 1 | -1) => {
    if (qty + value >= 1) {
      setQty(qty + value);
    }
  };

  const handleClick = () => {
    router.push(`/cash/${id}`);
  };

  return (
    <div className="border rounded-xl shadow-md p-4 mb-6 space-y-6 bg-white">
      {/* Partie principale : détails produit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Image + nom */}
        <div className="flex items-center gap-4 sm:w-1/3">
          <div className="w-20 h-20 relative rounded-md border">
            <Image
              src={image}
              alt={nom}
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{nom}</p>
            <p className="text-xs text-gray-500 mt-1">Ref: {id}</p>
          </div>
        </div>

        {/* Quantité */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setQuantity(-1)}>-</Button>
          <span className="w-6 text-center font-medium">{qty}</span>
          <Button variant="outline" size="sm" onClick={() => setQuantity(1)}>+</Button>
        </div>

        {/* Prix unitaire */}
        <div className="text-sm text-gray-700">
          <span className="font-medium">Prix :</span> {prix.toFixed(2)} €
        </div>

        {/* Supprimer */}
        <button
          onClick={() => deleteToCart(id)}
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Supprimer l'article"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Total */}
      <div className="flex justify-between sm:justify-end text-sm text-gray-800 px-2">
        <span className="font-semibold">Total :</span>
        <span className="pl-4 font-bold">{(prix * qty).toFixed(2)} €</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button variant="outline">Mettre à jour</Button>
        <Button onClick={handleClick}>Passer à la caisse</Button>
      </div>
    </div>
  );
};

export default CartElements;
