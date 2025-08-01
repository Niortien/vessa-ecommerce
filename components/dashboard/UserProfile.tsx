"use client";

import Image from "next/image";
import {
  BadgeCheck,
  XCircle,
  Instagram,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Client, Commande } from "@/lib/types";
import { getCommandesByClientId } from "@/service-anvogue/commande/commande.action";

export default function UserProfile({ client }: { client: Client[] }) {
  const { data: session } = useSession();

  const clientConnecte = client.find(
    (c) => c.nomUtilisateur === session?.user?.name
  );

  const [commandeSelectionnee, setCommandeSelectionnee] =
    useState<string | null>(null);
  const [commandes, setCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    if (!clientConnecte) return;
    async function fetchCommandes() {
      const result = await getCommandesByClientId(clientConnecte.id);
      if (result.success) {
        setCommandes(result.data);
      } else {
        console.error("Erreur fetch commandes:", result.error);
      }
    }
    fetchCommandes();
  }, [clientConnecte]);

  if (!clientConnecte) {
    return <div className="text-center py-10">Utilisateur non trouvé ou non connecté.</div>;
  }

  return (
    <section className="min-h-screen bg-white text-[#111827] p-4 md:p-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Mon Profil</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profil */}
        <div className="col-span-1 bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="w-40 h-40 relative mx-auto mb-4">
            <Image
              src={
                process.env.NEXT_PUBLIC_API_URL + "/" + session?.user.image || "/placeholder.jpg"
              }
              alt="Avatar"
              fill
              className="rounded-full object-cover border-4 border-blue-500"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center">{session?.user?.name}</h2>
          <p className="text-center text-sm text-gray-500 mb-4">{clientConnecte.email}</p>

          <div className="flex justify-center mb-6">
            {clientConnecte.isActive ? (
              <span className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-full text-sm text-white shadow">
                <BadgeCheck className="w-4 h-4" /> Compte Vérifié
              </span>
            ) : (
              <span className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-sm text-white shadow">
                <XCircle className="w-4 h-4" /> Compte Non Actif
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-medium">Nom:</span> {clientConnecte.nom}</p>
            <p><span className="font-medium">Prénom:</span> {clientConnecte.prenom}</p>
            <p><span className="font-medium">Adresse:</span> {clientConnecte.adresse}</p>
            <p><span className="font-medium">Téléphone:</span> {clientConnecte.phone}</p>
          </div>
        </div>

        {/* Commandes */}
        <div className="col-span-2 bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 overflow-auto max-h-[600px]">
          <h3 className="text-2xl font-semibold mb-4">Mes Commandes</h3>

          {commandes.length > 0 ? (
            <ul className="space-y-4">
              {commandes.map((commande) => (
                <li
                  key={commande.id}
                  onClick={() =>
                    setCommandeSelectionnee(
                      commandeSelectionnee === commande.id ? null : commande.id
                    )
                  }
                  className="p-4 bg-white rounded-xl shadow border hover:border-blue-500 transition cursor-pointer"
                >
                  <p className="font-medium text-lg">📦 Réf : {commande.id}</p>
                  <p className="text-sm text-gray-500">Statut : <span className="font-semibold text-blue-600">{commande.statut}</span></p>
                  <p className="text-sm text-gray-500">Total payé : {commande.total} FCFA</p>
                  <p className="text-sm text-gray-500">Date : {new Date(commande.date).toLocaleDateString()}</p>

                  {commandeSelectionnee === commande.id && (
                    <div className="mt-4 border-t pt-4 space-y-2">
                      <h4 className="font-semibold text-lg">Articles :</h4>
                      <ul className="space-y-2">
                        {commande.lignes.map((ligne) => {
                          const article = ligne.variete?.article || ligne.article;
                          return (
                            <li
                              key={ligne.id}
                              className="flex gap-4 border rounded p-3"
                            >
                              {article?.image ? (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/${article.image}`}
                                  alt={article.nom}
                                  width={50}
                                  height={50}
                                  className="rounded object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded" />
                              )}
                              <div>
                                <p className="font-medium">{article?.nom || "Article inconnu"}</p>
                                <p className="text-sm text-gray-500">Qté: {ligne.quantite} | Prix: {ligne.prixUnitaire} FCFA</p>
                                <p className="text-xs text-gray-400">Taille: {ligne.taille ?? "N/A"} | Couleur: {ligne.couleur ?? "N/A"}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune commande trouvée.</p>
          )}
        </div>
      </div>

      {/* Réseaux Sociaux */}
      <div className="mt-12 bg-gray-50 p-6 rounded-2xl shadow-md text-center border">
        <h3 className="text-xl font-semibold mb-4">Mes Réseaux</h3>
        <div className="flex justify-center gap-6">
          <Button variant="ghost">
            <Youtube className="text-red-500 w-6 h-6" />
          </Button>
          <Button variant="ghost">
            <Instagram className="text-pink-500 w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
