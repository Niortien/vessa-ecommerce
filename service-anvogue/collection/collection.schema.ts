import { z } from "zod";

export const createCollectionSchema = z.object({
  nom: z.string()
    .min(1, "Le nom de la collection est requis"),

  description: z.string().optional(),
  saison: z.string().optional(),
});

export type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;

export const updateCollectionSchema = z.object({
  nom: z.string().optional(),
  description: z.string().optional(),
  saison: z.string().optional(),
});

export type UpdateCollectionSchema = z.infer<typeof updateCollectionSchema>;
