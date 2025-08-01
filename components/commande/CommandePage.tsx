"use client";

import { useFinc } from "@/Store/Store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import Image from "next/image";
import { createCommande } from "@/service-anvogue/commande/commande.action";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Client } from "@/lib/types";

export default function CommandePage({ client }: { client: Client[] }) {
  const { cartArray, clearCart } = useFinc();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();

  const total = cartArray.reduce((acc, item) => acc + item.prix, 0);

  const clientData = client.find((c) => c.nomUtilisateur === session?.user?.name);
  const clientId = clientData?.id;
  const utilisateurId = session?.user?.id ?? undefined; // si NextAuth stocke l'id dans user.id

  // Sécurité minimale
  if (!clientId) {
    console.error("Client introuvable pour l'utilisateur connecté.");
  }

  const lignes = cartArray.map((item) => ({
    quantite: 1,
    prixUnitaire: item.prix,
    taille: null,
    couleur: null,
    articleId: item.id,
    varieteId: null,
  }));

  const handleSubmit = () => {
    if (cartArray.length === 0) {
      toast.error("Votre panier est vide !");
      return;
    }

    if (!clientId) {
      toast.error("Client non identifié !");
      return;
    }

    const commandeData = {
      clientId,             // ✅ requis
      utilisateurId,        // ✅ optionnel
      total,
      remise: 0,
      totalPaye: total,
      statut: "EN_ATTENTE",
      lignes,
    };

    console.log("Payload envoyé :", commandeData);

    startTransition(async () => {
      const result = await createCommande(commandeData);
      console.log("Résultat backend :", result);
      if (result.success) {
        toast.success("Commande enregistrée avec succès !");
        clearCart();
        router.push("/confirmation");
      } else {
        toast.error(result.error || "Erreur lors de la commande.");
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">Récapitulatif de commande</h1>

      {cartArray.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartArray.map((item) => (
              <li key={item.id} className="flex gap-4 items-center border p-4 rounded-md">
                <Image
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`
                  }
                  alt={item.nom}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.nom}</h2>
                  <p className="text-sm text-gray-500">{item.reference}</p>
                </div>
                <span className="font-bold">{item.prix.toFixed(2)} €</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <span className="text-xl font-semibold">Total :</span>
            <span className="text-xl font-bold text-primary">{total.toFixed(2)} €</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary/90 transition"
          >
            {isPending ? "Traitement en cours..." : "Valider la commande"}
          </button>

          <Button className="w-full bg-red text-white font-semibold py-3 rounded-md hover:bg-primary/90 transition">
            <Link href="/panier">Voir mon panier</Link>
          </Button>
        </>
      )}
    </div>
  );
}
