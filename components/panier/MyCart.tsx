"use client";

import { useFinc } from '@/Store/Store';
import React, { useEffect } from 'react';
import CartElements from './CartElements';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const CART_KEY = 'my-cart';

export default function MyCart() {
  const { cartArray, setCart } = useFinc();

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCart(parsed);
      } catch (error) {
        console.error('Erreur lors du parsing du panier', error);
      }
    }
  }, [setCart]);

  return (
    <div className="py-10 px-4 sm:px-8 max-w-screen-md mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-8">
        Mon panier
      </h1>

      {cartArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-20 text-gray-600">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
          <h2 className="text-xl font-semibold text-center">
            Votre panier est vide.
          </h2>
          <p className="text-sm text-center text-gray-500">
            Ajoutez des articles pour commencer vos achats.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartArray.map((item) => (
            <CartElements
              key={item.id}
              id={item.id}
              nom={item.nom}
              image={
                item.image.startsWith('http') // sécurité si jamais c’est une URL absolue déjà
                  ? item.image
                  : `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`
              }
              prix={item.prix}
              reference={item.reference}
              description={item.description}
            />
          ))}
        </div>
        
      )}
      <div>
       <Link href="/commande" >  <Button>Voir la commande </Button> </Link>
      </div>
    </div>
  );
}
