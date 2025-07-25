import ConfirmationPage from '@/components/confirmation/ConfirmationPage';
import React from 'react';

const Page = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">Page de Commande</h1>
            <p className="text-center text-gray-600">Cette page est dédiée à la gestion des commandes.</p>
            {/* Vous pouvez ajouter ici d'autres composants ou logiques spécifiques à la page de commande */}
            <ConfirmationPage/>
        </div>
    );
}

export default Page;
