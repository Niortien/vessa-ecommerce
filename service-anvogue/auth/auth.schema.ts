import { z } from "zod";

export const RoleEnum = z.enum(["ADMIN", "USER", "MODERATEUR"]); // adapte selon ton enum Prisma
export const GenreEnum = z.enum(["HOMME", "FEMME"]);

// Connexion
export const connexionSchema = z.object({
  email: z.string()
    .email({ message: "Vous devez entrer un email valide" }),
  password: z.string()
    .min(8, { message: "Vous devez utiliser un mot de passe d'au moins 8 caractères" }),
});
export type ConnexionSchema = z.infer<typeof connexionSchema>;

// Inscription
export const inscriptionSchema = z.object({
  nomComplet: z.string()
    .min(1, "Le nom complet est requis"),
  
  nomUtilisateur: z.string()
    .min(1, "Le nom d'utilisateur est requis"),
  
  email: z.string()
    .min(1, "L'email est requis")
    .email("Email invalide")
    .transform((val) => val.trim()),
  
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      {
        message:
          "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.",
      }
    )
    .transform((val) => val.trim()),

  role: RoleEnum,

  date_naissance: z.string(),

  genre: GenreEnum.optional(),

  avatar: z.string().trim().optional(),
});

export type InscriptionSchema = z.infer<typeof inscriptionSchema>;
