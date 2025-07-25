import { Commande } from './../type/type';
import { Avatar } from '@radix-ui/react-avatar';
import { AuthResponse } from './types';
export interface ArticleVariant {
  id: string;
  articleId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: VariantAttribute[];
  image?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
export  interface AuthResponseClient {
  accessToken: string;
  refreshToken: string;
  user: {
   id: string;                // UUID
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  email: string;
  phone: string;
  avatar: string | null; 
  // Peut être une URL ou null
  password: string;
  genre: "HOMME" | "FEMME" | "AUTRE";  // Enum Genres, adapte selon tes valeurs
  adresse: string;
  date_naissance?: string;   // ISO date string
   createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  }
}
 export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    nomComplet: string;
    nomUtilisateur: string;
    email: string;
    role: 'ADMIN' | 'USER' | string; // ajuste selon les rôles possibles
    date_naissance: string; // ISO date string
    genre: 'HOMME' | 'FEMME' | string; // ajuste selon les genres possibles
    avatar: string | null;
    createdAt: string; // ISO date string
  };
}
export interface VariantAttribute {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'size' | 'material' | 'style' | 'custom';
  displayValue?: string;
  hexColor?: string; // Pour les couleurs
}

export interface Category {
  id: string;
  nom: string;
  description: string;
  type: string; // 'clothing', 'accessories', etc.
  articles?: Article[];
}

export interface Collection {
  id: string;
  nom: string;
  description: string;
  saison: string


}
export interface Taille {
  taille?: string;
  quantite?: number;
  prix?: number;
}
export interface Commande {
  id: string;                    // @id @default(uuid()) @db.Uuid
  date: string;                  // DateTime, on utilise string ISO en TS
  reference: string;             // @unique
  statut: StatutCommande;        // Enum (ex: 'EN_ATTENTE', 'VALIDEE', ...)
  total: number;                 // Float
  remise?: number | null;        // Float? @default(0)
  totalPaye?: number | null;     // Float? @default(0)

  utilisateur_id?: string | null;  // String? @db.Uuid
  utilisateur?: Utilisateur | null;  // relation optionnelle

  client_id: string;             // String @db.Uuid
  client: Client;                // relation obligatoire

  lignes: LigneCommande[];       // Tableau de lignes de commande
}

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  email: string;
  phone: string;
  password: string;
  genre: "HOMME" | "FEMME" | string; // à ajuster selon l'enum Genres utilisé
  adresse: string;
  date_naissance?: string | Date;
  avatar?: string;
  isActive?: boolean;
  totalOrders?: bigint | number;
  totalSpent?: bigint | number;
  createdAt: string | Date;
  updatedAt: string | Date;
  commandes: Commande[];
  favoris: Favoris[];
  notes: Note[];
}


interface LigneCommande {
  id: string;              // UUID
  quantite: number;
  prixUnitaire: number;
  taille?: string | null;
  couleur?: string | null;

  variete: Variete;        // à typer selon ton modèle Variete
  variete_id: string;

  commande: Commande;
  commande_id: string;
}

interface Commande {
  id: string;              // UUID
  date: string;            // ISO date string
  statut: "EN_ATTENTE" | "TRAITEE" | "ANNULLEE" | string; // Enum StatutCommande, adapte si besoin
  total: number;

  utilisateur: Utilisateur;
  utilisateur_id: string;

  client: Client;
  client_id: string;

  lignes: LigneCommande[];
}

interface Note {
  id: string;              // UUID
  etoile: number;          // Decimal -> number (attention précision)
  commentaire: string;
  reponse?: string | null; // UUID ou null

  client: Client;
  client_id: string;

  article: Article;        // à typer selon ton modèle Article
  article_id: string;

  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
}

interface Favoris {
  id: string;              // UUID

  client: Client;
  client_id: string;

  article: Article;
  article_id: string;
}

interface Utilisateur {
  id: string;              // UUID
  nomComplet: string;
  nomUtilisateur: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | string;   // Enum Role, adapte selon tes valeurs
  date_naissance?: string | null;   // ISO date string ou null
  genre?: "HOMME" | "FEMME" | "AUTRE" | null; // Enum Genres
  avatar?: string | null;

  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string

  commandes: Commande[];
  audits: Audit[];         // à typer selon ton modèle Audit
}
// Exemple d’interface Commande, Favori, Note basique (à adapter)







export interface Article {
  id: string;
  reference: string;
  nom: string;
  description?: string;
  infos: Taille[]; // ✅ maintenant typé, plus clair
  status: string;
  image?: string;
  quantite?: number;
  prix: number;
  genre: string;
  estEnPromotion?: boolean;
  prixPromotion?: number;

  // Relations
  categorie_id: string;
  collection?: Collection;
  collection_id?: string;

  varietes: Variete[];
  notes: Note[];
  favoris: Favoris[];

  createdAt: Date;
  updatedAt: Date;
}


// Définition du type pour les tailles
export type TailleVariete = {
  taille: string;
  quantite: number;
  prix: number;
};

// Interface TypeScript pour Variete
export interface Variete {
  id: string;
  reference: string;
  couleur: string;
  tailles?: TailleVariete[]; // correspond au champ JSON
  image?: string;

  // Relation avec Article
  article: {
    id: string;
    nom: string; // tu peux ajouter d'autres champs nécessaires, ou importer l'interface Article complète si besoin
  };
  article_id: string;
}

export interface DashboardStats {
  totalArticles: number;
  totalVariants: number;
  totalClients: number;
  totalSales: number;
  totalRevenue: number;
  monthlyGrowth: number;
  popularArticles: Article[];
}

export interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

export interface CategoryStats {
  name: string;
  count: number;
  percentage: number;
}

export interface AttributeTemplate {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'style' | 'custom';
  values: string[];
  isRequired: boolean;
}

export interface Inscription {
  nomComplet: string;
  nomUtilisateur: string;
  email: string;
  password: string;
  role: string;
  date_naissance?: string; // en format ISO string ou "dd/MM/yyyy"
  genre?: string;
  avatar?: string | File; // Peut être une URL ou un fichier
}