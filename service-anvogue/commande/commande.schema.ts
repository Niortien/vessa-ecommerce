import { z } from "zod";

// Enum StatutCommande (exemple à adapter)
export const StatutCommande = z.enum([
  "EN_ATTENTE",
  "VALIDEE",
  "ANNULEE",
  "LIVREE",
]);

// Schéma LigneCommande
const ligneCommandeSchema = z.object({
  quantite: z.number({
    required_error: "La quantité est requise",
    invalid_type_error: "La quantité doit être un nombre",
  }).int().positive(),

  prixUnitaire: z.number({
    required_error: "Le prix unitaire est requis",
    invalid_type_error: "Le prix unitaire doit être un nombre",
  }).positive(),

  taille: z.string().optional().nullable(),
  couleur: z.string().optional().nullable(),

  article_id: z.string().uuid().optional().nullable(),
  variete_id: z.string().uuid().optional().nullable(),
});

// Schéma principal Commande
export const createCommandeSchema = z.object({
  client_id: z.string({
    required_error: "L'identifiant du client est requis",
  }).uuid(),

  utilisateur_id: z.string().uuid().optional().nullable(),

  total: z.number({
    required_error: "Le total est requis",
    invalid_type_error: "Le total doit être un nombre",
  }).nonnegative(),

  remise: z.number().nonnegative().optional().nullable().default(0),

  totalPaye: z.number().nonnegative().optional().nullable().default(0),

  statut: StatutCommande.optional().default("EN_ATTENTE"),

  lignes: z.array(ligneCommandeSchema).min(1, "La commande doit avoir au moins une ligne"),
});

export type CreateCommandeSchema = z.infer<typeof createCommandeSchema>;
export const updateCommandeSchema = createCommandeSchema.partial();

export type UpdateCommandeSchema = z.infer<typeof updateCommandeSchema>;