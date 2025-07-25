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
export interface LigneCommande {
  id: string;                   // @id @default(uuid()) @db.Uuid
  quantite: number;             // Int
  prixUnitaire: number;         // Float
  taille?: string | null;       // String?
  couleur?: string | null;      // String?

  article_id?: string | null;   // String? @db.Uuid
  article?: Article | null;     // relation optionnelle

  variete_id?: string | null;   // String? @db.Uuid
  variete?: Variete | null;     // relation optionnelle

  commande_id: string;          // String @db.Uuid (obligatoire)
  // La relation vers la commande est souvent exclue pour éviter la récursion infinie
  // commande?: Commande;        // facultatif, souvent on ne met pas la relation inverse ici
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