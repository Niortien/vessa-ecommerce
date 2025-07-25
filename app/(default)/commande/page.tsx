import CommandePage from '@/components/commande/CommandePage';
import { Client } from '@/lib/types';
import React from 'react';

const  Page =  async() => {
     const reponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`)
  const client:Client[]=await reponse.json()
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">Page de Commande</h1>
            <p className="text-center text-gray-600">Cette page est dédiée à la gestion des commandes.</p>
            {/* Vous pouvez ajouter ici d'autres composants ou logiques spécifiques à la page de commande */}

            <CommandePage client={client} />
        </div>
    );
}

export default Page;
