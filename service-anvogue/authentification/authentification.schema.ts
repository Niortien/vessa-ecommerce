import { z } from "zod";
import { isValid, parseISO } from "date-fns";

// ✅ Schéma commun de connexion (utilisateur et client)
const baseConnexionSchema = z.object({
  email: z.string()
    .min(1, "Vous devez entrer un email")
    .email({ message: "Vous devez entrer un email valide" }),
  password: z.string()
    .min(8, { message: "Vous devez utiliser un mot de passe d'au moins 8 caractères" }),
});

// Connexion utilisateur
export const connexionUtilisateurSchema = baseConnexionSchema;
export type ConnexionUtilisateurSchema = z.infer<typeof connexionUtilisateurSchema>;


// ✅ Schéma commun de connexion (utilisateur et client)
export const connexionClientOtpSchema = z.object({
  email: z.string()
    .min(1, "Vous devez entrer un email")
    .email({ message: "Vous devez entrer un email valide" }),
  otp: z.string()
    .min(6, { message: "Vous devez utiliser un code de 6 caractères" }),
});

// Connexion utilisateur
export type ConnexionClientOtpSchema = z.infer<typeof connexionClientOtpSchema>;


// Connexion client
export const connexionClientSchema = baseConnexionSchema;
export type ConnexionClientSchema = z.infer<typeof connexionClientSchema>;

// ✅ Schéma d'inscription utilisateur
export const inscriptionUtilisateurSchema = z.object({
  nomComplet: z.string()
    .min(1, "Entrez votre nom complet (nom + prénom)"),
  nomUtilisateur: z.string()
    .min(1, "Entrez votre nom d'utilisateur"),
  email: z.string()
    .min(1, "Entrez votre email")
    .email({ message: "Email invalide" }),
  password: z.string()
    .min(8, "Entrez votre mot de passe"),

 role: z.enum(["GESTIONNAIRE", "ADMIN", "CAISSE"], {
  message: "Rôle invalide",
}),


  date_naissance: z.string()
    .min(1, "Vous devez entrer votre date de naissance")
    .refine((value) => isValid(parseISO(value)), {
      message: "La date n’est pas valide",
    }),

  genre: z.enum(["HOMME", "FEMME", "AUTRE"], {
  message: "Genre invalide",
}),


  avatar: z
    .instanceof(File)
    .refine((file) => file.size > 0, "La photo est requise")
    .refine((file) => file.size <= 10 * 1024 * 1024, "La taille ne doit pas dépasser 10 Mo")
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Format non supporté (JPEG, PNG, GIF uniquement)"
    )
    .optional(),
});
export type InscriptionUtilisateurSchema = z.infer<typeof inscriptionUtilisateurSchema>;

// ✅ Schéma d'inscription client (corrigé)
export const inscriptionClientSchema = z.object({
  nom: z.string()
    .min(1, "Vous devez entrer votre nom"),
  prenom: z.string()
    .min(1, "Vous devez entrer votre prénom"),
  nomUtilisateur: z.string()
    .min(1, "Vous devez entrer votre nom d'utilisateur"),
  email: z.string()
    .min(1, "Vous devez entrer votre email")
    .email({ message: "Email invalide" }),

  phone: z.string()
    .regex(/^\+225[0-9]{8,10}$/, {
      message: "Le numéro doit commencer par +225 suivi de 8 à 10 chiffres",
    }),

  password: z.string()
    .min(8, "Vous devez entrer un mot de passe contenant au moins 8 caractères"),

 genre: z.enum(["HOMME", "FEMME", "AUTRE"], {
  message: "Genre invalide",
})
,

  adresse: z.string()
    .min(1, "Vous devez entrer votre adresse"),

  date_naissance: z.string()
    .min(1, "Vous devez entrer votre date de naissance")
    .refine((value) => isValid(parseISO(value)), {
      message: "La date n’est pas valide",
    }),

  avatar: z
    .instanceof(File)
    .refine((file) => file.size > 0, "La photo est requise")
    .refine((file) => file.size <= 10 * 1024 * 1024, "La taille ne doit pas dépasser 10 Mo")
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Format non supporté (JPEG, PNG, GIF uniquement)"
    )
    .optional(),
});
export type InscriptionClientSchema = z.infer<typeof inscriptionClientSchema>;
