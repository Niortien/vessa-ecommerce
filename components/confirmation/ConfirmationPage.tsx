"use client";

import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-primary">Merci pour votre commande !</h1>
      <p className="mb-8 text-center text-gray-700 max-w-md">
        Votre commande a bien été enregistrée. Nous vous contacterons bientôt pour la suite.
      </p>
      <button
        onClick={() => router.push("/panier")}
        className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition font-semibold"
      >
        Retourner au panier
      </button>
    </div>
  );
}
