import CommandePage from '@/components/commande/CommandePage';
import { Client } from '@/lib/types';
import React from 'react';

const Page = async () => {
  let client: Client[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`);
    if (!response.ok) throw new Error('Erreur lors du chargement des clients');
    client = await response.json();
  } catch (error) {
    console.error('Erreur fetch clients:', error);
    // Tu peux gérer un fallback, ou afficher un message d'erreur ici
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10">Page de Commande</h1>
      <p className="text-center text-gray-600">Cette page est dédiée à la gestion des commandes.</p>

      <CommandePage client={client} />
    </div>
  );
};

export default Page;
