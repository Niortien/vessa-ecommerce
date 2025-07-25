"use client";

import { Taille, Variete } from "@/type/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Article = {
   id: string;
    reference: string;
    nom: string;
    description?: string;
    infos: Taille[]; // 
    status: string;
    image?: string;
    quantite?: number;
    prix: number;
    genre: string;
    estEnPromotion?: boolean;
    prixPromotion?: number;
  
    // Relations
    categorie_id: string;
   
    collection_id?: string;
  
    varietes: Variete[];
   
};

type Store = {
  cartArray: Article[];
  addToCart: (item: Article) => void;
  deleteToCart: (id: string) => void;
  clearCart: () => void;
};

export const useFinc = create<Store>()(
  persist(
    (set, get) => ({
      cartArray: [],

      addToCart: (item) => {
        const updated = [...get().cartArray, item];
        set({ cartArray: updated });
      },

      deleteToCart: (id) => {
        const updated = get().cartArray.filter((item) => item.id !== id);
        set({ cartArray: updated });
      },

      clearCart: () => {
        set({ cartArray: [] });
      },
    }),
    {
      name: "my-cart", // clé localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
