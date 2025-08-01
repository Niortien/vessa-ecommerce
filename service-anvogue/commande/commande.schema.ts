import { StatutCommande } from "@/lib/types";
import { z } from "zod";

// Enum des statuts de commande


// Ligne de commande
export const ligneCommandeSchema = z.object({
  quantite: z.number()
    .int({ message: "La quantité doit être un entier" })
    .positive({ message: "La quantité doit être positive" }),

  prixUnitaire: z.number()
    .positive({ message: "Le prix unitaire doit être positif" }),

  taille: z.string().optional().nullable(),

  couleur: z.string().optional().nullable(),

  articleId: z.string().uuid({ message: "articleId doit être un UUID valide" }).optional().nullable(),

  varieteId: z.string().uuid({ message: "varieteId doit être un UUID valide" }).optional().nullable(),
}).strict();

// Création de commande
export const createCommandeSchema = z.object({
  clientId: z.string()
    .uuid({ message: "L'identifiant du client doit être un UUID valide" }),

  utilisateurId: z.string()
    .uuid({ message: "L'identifiant de l'utilisateur doit être un UUID valide" })
    .optional()
    .nullable(),

  total: z.number()
    .nonnegative({ message: "Le total doit être positif ou nul" }),

  remise: z.number()
    .nonnegative({ message: "La remise doit être positive ou nulle" })
    .optional()
    .nullable()
    .default(0),

  totalPaye: z.number()
    .nonnegative({ message: "Le total payé doit être positif ou nul" })
    .optional()
    .nullable()
    .default(0),

  statut: z.nativeEnum(StatutCommande).optional().default(StatutCommande.EN_ATTENTE),

  lignes: z.array(ligneCommandeSchema)
    .min(1, { message: "La commande doit avoir au moins une ligne" }),
});

export type CreateCommandeSchema = z.infer<typeof createCommandeSchema>;

// Pour la mise à jour, on rend tous les champs optionnels
export const updateCommandeSchema = createCommandeSchema.partial();
export type UpdateCommandeSchema = z.infer<typeof updateCommandeSchema>;
