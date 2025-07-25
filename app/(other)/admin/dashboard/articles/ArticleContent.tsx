'use client';

import { useState, useRef } from 'react';
import { useForm, useFieldArray, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createArticleSchema,
  updateArticleSchema,
  CreateArticleSchema,
  UpdateArticleSchema,
} from '@/service-anvogue/article/article.shema';
import {
  createVarieteSchema,
  updateVarieteSchema,
  CreateVarieteSchema,
  UpdateVarieteSchema,
} from '@/service-anvogue/variete/variete.schema';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Search, Edit, Trash2, Palette, Heart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createArticle, updateArticle, deleteArticle } from '@/service-anvogue/article/article.action';
import { Article, Category, Collection, Variete } from '@/lib/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { createVariete, updateVariete } from '@/service-anvogue/variete/variete.action';

export default function ArticleContent({
  article,
  categorie,
  collection
}: {
  article: { data: Article[]; total: number; page: number; limit: number };
  categorie: Category[];
  collection: Collection[];
}) {
  const [articles, setArticles] = useState<Article[]>(article.data);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingVariant, setEditingVariant] = useState<Variete | null>(null);
  const [selectedArticleForVariant, setSelectedArticleForVariant] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>(categorie);
  const [collections, setCollections] = useState<Collection[]>(collection);
  
  const [files, setFiles] = useState<File[]>([]);
  const newArticleBtnRef = useRef<HTMLButtonElement>(null);

  const getCategoryName = (categoryId: string): string => {
    if (!categoryId) return 'N/A';
    const category = categories.find(cat => cat.id === categoryId);
    return category?.nom || 'N/A';
  };
  const getCollectionName = (collectionId: string): string => {
    if (!collectionId) return 'Aucune collection';
    const collection = collections.find(col => col.id === collectionId);
    return collection?.nom || 'Aucune collection';
  };

  // FORMULAIRE ARTICLE
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      nom: '',
      description: '',
      prix: 0,
      genre: 'HOMME',
      quantite: 0,
      estEnPromotion: false,
      categorie_id: '',
      collection_id: '',
      image: '',
      infos: [],
    },
  });
  const filteredArticles = articles.filter(article =>
    article.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FORMULAIRE VARIANTE
  const {
    register: registerVariant,
    handleSubmit: handleSubmitVariant,
    reset: resetVariant,
    control: controlVariant,
    formState: { errors: variantErrors, isSubmitting: isSubmittingVariant },
  } = useForm<CreateVarieteSchema>({
    resolver: zodResolver(editingVariant ? updateVarieteSchema : createVarieteSchema),
    defaultValues: {
      couleur: '',
      image: '',
      tailles: [],
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: controlVariant,
  //   name: 'tailles',
  // });

  // ENVOI ARTICLE
const handleSubmitArticle: SubmitHandler<CreateArticleSchema> = async (data) => {
  try {
    const payload: CreateArticleSchema = {
      ...data,
      image: files.length > 0 && files[0] instanceof File ? files[0] : undefined,
    };

    console.log("Payload de l'article à envoyer :", payload); // debug temporaire pour voir les données envoyé par mon front

    let result: { success: boolean; data?: Article; error?: string };
    if (editingArticle) {
      const editingId = editingArticle.id;
      result = await updateArticle(editingId, payload as UpdateArticleSchema);
      if (result.success && result.data) {
        setArticles(prev =>
          prev.map(article =>
            article.id === editingId ? result.data! : article
          )
        );
        toast.success("Article modifié avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la modification");
        return;
      }
    } else {
      result = await createArticle(payload);
      if (result.success && result.data) {
        setArticles(prev => [...prev, result.data]);
        toast.success("Article créé avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la création de l'article");
        return;
      }
    }

    reset(undefined, {
      keepValues: false,
      keepDirty: false,
      shouldFocusError: false,
    });
    setFiles([]);
    setEditingArticle(null);
    setIsDialogOpen(false);
  } catch (err) {
    console.error("Erreur inattendue :", err);
    toast.error("Erreur inattendue");
  }
};
// ADMISSION DU FORMULAIRE D'UNE VARIANTE
const onSubmitVariants: SubmitHandler<CreateVarieteSchema> = async (data) => {
  try {
    const payload: CreateVarieteSchema = {
      ...data,
      image: files.length > 0 && files[0] instanceof File ? files[0] : undefined,
    };

    let result;

    if (editingVariant) {
      // 🔁 MODIFICATION
      result = await updateVariete(editingVariant.id, payload as UpdateVarieteSchema);
      if (result.success && result.data) {
        toast.success("Variante modifiée avec succès");
        // 👇 ici, à la place de `setEditingVariant`, tu dois MAJ l’article sélectionné
        setArticles(prev =>
          prev.map(article =>
            article.id === selectedArticleForVariant?.id
              ? {
                  ...article,
                  varietes: article.varietes.map(v =>
                    v.id === editingVariant.id ? result.data : v
                  ),
                }
              : article
          )
        );
      } else {
        toast.error(result.error || "Erreur lors de la modification");
        return;
      }
    } else {
      // ➕ CRÉATION
      result = await createVariete({
        ...payload,
        article_id: selectedArticleForVariant?.id, // Assure-toi d’avoir ça
      });

      if (result.success && result.data) {
        toast.success("Variante créée avec succès");

        // 👇 On ajoute la nouvelle variante à l’article sélectionné
        setArticles(prev =>
          prev.map(article =>
            article.id === selectedArticleForVariant?.id
              ? {
                  ...article,
                  varietes: [...(article.varietes || []), result.data],
                }
              : article
          )
        );
      } else {
        toast.error(result.error || "Erreur lors de la création de la variante");
        return;
      }
    }

    resetVariant();
    setFiles([]);
    setEditingVariant(null);
    setIsVariantDialogOpen(false);
  } catch (err) {
    console.error("Erreur inattendue :", err);
    toast.error("Erreur inattendue");
  }
};



  const { fields: infosFields, append: appendInfo, remove: removeInfo } = useFieldArray({
    control,
    name: 'infos',
  });

  //TODO:formulaire UseForm de taille nil faut que je place cette partie dans le formulaire de la varieté
   const { fields: taillesFields, append: appendTailles, remove: removeTailles } = useFieldArray({
    control,
    name: 'tailles',
  });

  // // ENVOI VARIANTE ANCIEN
  // const onSubmitVariant: SubmitHandler<CreateVarieteSchema> = async (data: CreateVarieteSchema) => {
  //   if (!selectedArticleForVariant) return;
  //   const payload: CreateVarieteSchema = {
  //     ...data,
  //     article_id: selectedArticleForVariant.id,
  //   };
  //   const result = await createVariete(payload);
  //   if (result.success) {
  //     toast.success("Variante créée avec succès");
  //     setIsVariantDialogOpen(false);
  //     resetVariant();
  //     setEditingVariant(null);
  //     setSelectedArticleForVariant(null);
  //   } else {
  //     toast.error(result.error || "Erreur lors de la création de la variante");
  //   }
  // };

  // AJOUT ARTICLE
  const handleAddArticle = () => {
    setEditingArticle(null);
    reset({
      nom: '',
      description: '',
      prix: 0,
      genre: 'HOMME',
      quantite: 0,
      estEnPromotion: false,
      categorie_id: '',
      collection_id: '',
      image: undefined,
      infos: [],
    });
    setIsDialogOpen(true);
  };

  // ÉDITION ARTICLE
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    reset({
      nom: article.nom || '',
      description: article.description || '',
      prix: article.prix || 0,
      genre: article.genre ?? 'HOMME',
      estEnPromotion: article.estEnPromotion || false,
      categorie_id: article.categorie_id ?? '',
      collection_id: article.collection_id ?? '',
      image: undefined,
      quantite: article.quantite || 0,
      infos: Array.isArray(article.infos) ? article.infos : [],
    });
    setIsDialogOpen(true);
  };

  // AJOUT VARIANTE
  const handleAddVariant = (article: Article) => {
    setSelectedArticleForVariant(article);
    setEditingVariant(null);
    resetVariant({
      couleur: '',
      image: '',
      tailles: [],
    });
    setIsVariantDialogOpen(true);
  };

  // ÉDITION VARIANTE
  const handleEditVariant = (article: Article, variant: Variete) => {
    setSelectedArticleForVariant(article);
    setEditingVariant(variant);
    resetVariant({
      couleur: variant.couleur,
      image: variant.image ,
      tailles: variant.tailles || [],
    });
    setIsVariantDialogOpen(true);
  };

  // SUPPRESSION ARTICLE
  const handleDeleteArticle = async (id: string) => {
    const result = await deleteArticle(id);
    console.log("Résultat suppression :", result);
    if (!result.success) {
      toast.error("Une erreur s'est produite lors de la suppression de l'article");
      return;
    }

//TODO: tache de 14/072025:lors de la modification d'un article,il faut que  mette obligatoirement que l'article est  en promotion cest pas normal
    try {
      setArticles(prev => prev.filter(article => article.id !== id));
      toast.success("Article supprimé avec succès");
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Une erreur inattendue s'est produite");
    }
  };

  // SUPPRESSION VARIANTE
  const handleDeleteVariant = (articleId: string, variantId: string) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? {
              ...article,
              varietes: (article.varietes || []).filter(v => v.id !== variantId),
            }
          : article
      )
    );
    toast.success("Variante supprimée avec succès");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      newArticleBtnRef.current?.focus();
    }, 100); // laisse le temps au Dialog de se fermer
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles & Variantes</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue d&apos;articles et leurs variantes</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                ref={newArticleBtnRef}
                onClick={handleAddArticle}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Nouvel Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
                </DialogTitle>
              </DialogHeader>
 <form
  onSubmit={handleSubmit(handleSubmitArticle)}
  className="space-y-6 p-6 max-h-[90vh] overflow-y-auto bg-[#F8F5F0] rounded-2xl shadow-lg"
>
  {/* Nom */}
  <div>
    <Label htmlFor="nom">Nom <span className="text-red-500">*</span></Label>
    <Input id="nom" {...register('nom')} placeholder="Nom de l'article" />
    {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
  </div>

  {/* Description */}
  <div>
    <Label htmlFor="description">Description</Label>
    <Textarea
      id="description"
      {...register('description')}
      placeholder="Description de l'article"
      rows={3}
      className="resize-none"
    />
    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
  </div>

  {/* Catégorie et Collection */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <Label htmlFor="categorie_id">Catégorie <span className="text-red-500">*</span></Label>
      <Controller
        name="categorie_id"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.categorie_id && <p className="text-red-500 text-sm mt-1">{errors.categorie_id.message}</p>}
    </div>

    <div>
      <Label htmlFor="collection_id">Collection</Label>
      <Controller
        name="collection_id"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value || ''}
            onValueChange={(val) => field.onChange(val === 'none' ? '' : val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Aucune</SelectItem>
              {collections.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.collection_id && <p className="text-red-500 text-sm mt-1">{errors.collection_id.message}</p>}
    </div>
  </div>

  {/* Genre */}
  <div>
    <Label htmlFor="genre">Genre</Label>
    <Controller
      name="genre"
      control={control}
      render={({ field }) => (
        <Select value={field.value || ''} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HOMME">HOMME</SelectItem>
            <SelectItem value="FEMME">FEMME</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
  </div>

  {/* Prix & Quantité */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <Label htmlFor="prix">Prix (€) <span className="text-red-500">*</span></Label>
      <Input
        id="prix"
        type="number"
        step="0.01"
        min="0"
        {...register('prix', { valueAsNumber: true })}
        placeholder="0.00"
      />
      {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix.message}</p>}
    </div>
    <div>
      <Label htmlFor="quantite">Quantité</Label>
      <Input
        id="quantite"
        type="number"
        min="0"
        {...register('quantite', { valueAsNumber: true })}
        placeholder="0"
      />
      {errors.quantite && <p className="text-red-500 text-sm mt-1">{errors.quantite.message}</p>}
    </div>
  </div>

  {/* Promotion */}
  <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-xl">
    <div className="flex items-center space-x-2">
      <Controller
        name="estEnPromotion"
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            id="estEnPromotion"
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
        )}
      />
      <Label htmlFor="estEnPromotion">Article en promotion</Label>
    </div>
    {watch('estEnPromotion') && (
      <div>
        <Label htmlFor="prixPromotion">Prix promotionnel (€)</Label>
        <Input
          id="prixPromotion"
          type="number"
          step="0.01"
          min="0"
          {...register('prixPromotion', { valueAsNumber: true })}
          placeholder="0.00"
        />
        {errors.prixPromotion && <p className="text-red-500 text-sm mt-1">{errors.prixPromotion.message}</p>}
      </div>
    )}
  </div>

  {/* Image */}
  <div>
    <Label htmlFor="image">Image</Label>
    <input
      type="file"
      id="image"
      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setFiles([e.target.files[0]]);
        }
      }}
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
    <p className="text-xs text-gray-500 mt-1">Formats: JPEG, PNG, GIF, WebP (max 10 Mo)</p>
    {typeof errors.image?.message === 'string' && (
      <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
    )}
  </div>

  {/* Infos (Tailles) */}
  <div>
    <Label>Tailles, prix et quantités</Label>
    <div className="space-y-4 mt-3">
      {taillesFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor={`infos.${index}.taille`}>Taille</Label>
            <Input {...register(`infos.${index}.taille`)} placeholder="M" />
          </div>
          <div>
            <Label htmlFor={`infos.${index}.quantite`}>Quantité</Label>
            <Input
              type="number"
              min={0}
              {...register(`infos.${index}.quantite`, { valueAsNumber: true })}
              placeholder="10"
            />
          </div>
          <div>
            <Label htmlFor={`infos.${index}.prix`}>Prix (€)</Label>
            <Input
              type="number"
              step="0.01"
              min={0}
              {...register(`infos.${index}.prix`, { valueAsNumber: true })}
              placeholder="99.99"
            />
          </div>
          <button
            type="button"
            onClick={() => removeInfo(index)}
            className="text-red-600 text-sm col-span-3 text-right hover:underline"
          >
            Supprimer
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => appendTailles({ taille: '', quantite: 0, prix: 0 })}
        className="w-fit"
      >
        + Ajouter une taille
      </Button>
    </div>
  </div>

  {/* Boutons */}
  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
    <Button
      type="button"
      variant="outline"
      onClick={handleCloseDialog}
      disabled={isSubmitting}
    >
      Annuler
    </Button>
    <Button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Enregistrement...' : editingArticle ? 'Modifier' : 'Créer'}
    </Button>
  </div>
</form>



            </DialogContent>
          </Dialog>
          <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}></Dialog>
          <Dialog open={isVariantDialogOpen} onOpenChange={setIsVariantDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {editingVariant ? 'Modifier la variante' : 'Nouvelle variante'}
                  {selectedArticleForVariant && (
                    <span className="text-sm text-gray-500 block">
                      pour {selectedArticleForVariant.nom}
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>
              {/* FORMULAIRE DE  DE LA VARIETE */}


<form
  onSubmit={handleSubmitVariant(onSubmitVariants)}
  className="space-y-6 bg-[#F8F5F0] p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
>
  {/* Couleur */}
  <div>
  <Label htmlFor="couleur" className="text-gray-800 font-medium">
    Couleur <span className="text-red-500">*</span>
  </Label>
  <select
    id="couleur"
    {...registerVariant("couleur")}
    className="mt-1 bg-white border border-gray-300 rounded px-3 py-2 w-full"
    defaultValue=""
  >
    <option value="" disabled>Choisissez une couleur</option>
    <option value="red">Rouge</option>
    <option value="blue">Bleu</option>
    <option value="navy">Bleu marine</option>
    <option value="black">Noir</option>
    <option value="white">Blanc</option>
    <option value="green">Vert</option>
    <option value="yellow">Jaune</option>
    <option value="orange">Orange</option>
    <option value="purple">Violet</option>
    <option value="brown">Marron</option>
    <option value="gray">Gris</option>
    <option value="beige">Beige</option>
    <option value="pink">Rose</option>
  </select>

  {variantErrors.couleur && (
    <p className="text-red-500 text-sm mt-1">
      {variantErrors.couleur.message}
    </p>
  )}
</div>


  {/* Image */}
  <div>
    <Label htmlFor="image" className="text-gray-800 font-medium">Image <span className="text-red-500">*</span></Label>
    <div className="mt-1 space-y-2">
      <input
        type="file"
        id="image"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
          }
        }}
        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
      />
      <p className="text-xs text-gray-600">
        Sélectionnez une image (JPEG, PNG, GIF, WebP - max 10 Mo)
      </p>
    </div>
    {variantErrors.image && (
      <p className="text-red-500 text-sm mt-1">{variantErrors.image.message}</p>
    )}
  </div>

  {/* Article associé */}
  <div>
    <Label htmlFor="article_id" className="text-gray-800 font-medium">Article</Label>
    <Controller
      name="article_id"
      control={controlVariant}
      defaultValue={selectedArticleForVariant?.id ?? ''}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={(val) => field.onChange(val === "none" ? "" : val)}
        >
          <SelectTrigger className="bg-white border-gray-300">
            <SelectValue placeholder="Sélectionner un article" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="none">Aucun</SelectItem>
            {articles.map((article) => (
              <SelectItem key={article.id} value={article.id}>
                {article.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
    {variantErrors.article_id && (
      <p className="text-red-500 text-sm mt-1">{variantErrors.article_id.message}</p>
    )}
  </div>

  {/* Tailles */}
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Tailles et stock</h3>
        <p className="text-sm text-gray-600">Ajoutez les tailles disponibles</p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => appendTailles({ taille: "", quantite: 0, prix: 0 })}
        className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        <Plus size={16} />
        <span>Ajouter une taille</span>
      </Button>
    </div>

    {taillesFields.length === 0 && (
      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <p>Aucune taille ajoutée</p>
        <p className="text-sm">Cliquez sur "Ajouter une taille"</p>
      </div>
    )}

    <div className="space-y-3">
      {taillesFields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg bg-white"
        >
          {/* Taille */}
          <div>
            <Label htmlFor={`tailles.${index}.taille`}>
              Taille <span className="text-red-500">*</span>
            </Label>
            <Input
              {...registerVariant(`tailles.${index}.taille`)}
              placeholder="Ex: S, M, L"
              className="mt-1 bg-white"
            />
            {variantErrors.tailles?.[index]?.taille && (
              <p className="text-red-500 text-sm mt-1">
                {variantErrors.tailles[index]?.taille?.message}
              </p>
            )}
          </div>

          {/* Quantité */}
          <div>
            <Label>
              Quantité <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              min={0}
              {...registerVariant(`tailles.${index}.quantite`, { valueAsNumber: true })}
              className="mt-1 bg-white"
              placeholder="0"
            />
            {variantErrors.tailles?.[index]?.quantite && (
              <p className="text-red-500 text-sm mt-1">
                {variantErrors.tailles[index]?.quantite?.message}
              </p>
            )}
          </div>

          {/* Prix */}
          <div>
            <Label>
              Prix (€) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              min={0}
              {...registerVariant(`tailles.${index}.prix`, { valueAsNumber: true })}
              className="mt-1 bg-white"
              placeholder="0.00"
            />
            {variantErrors.tailles?.[index]?.prix && (
              <p className="text-red-500 text-sm mt-1">
                {variantErrors.tailles[index]?.prix?.message}
              </p>
            )}
          </div>

          {/* Supprimer */}
          <div className="flex items-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeTailles(index)}
              className="text-red-600 hover:bg-red-100 w-full md:w-auto"
              title="Supprimer cette taille"
            >
              <Trash2 size={16} className="mr-2 md:mr-0" />
              <span className="md:hidden">Supprimer</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Résumé */}
  <div className="bg-white p-4 rounded-lg border">
    <h4 className="text-sm font-medium text-gray-800 mb-2">Résumé</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
      <div>
        <span className="font-medium">Nombre de tailles :</span>
        <span className="ml-2">{taillesFields.length}</span>
      </div>
    </div>
  </div>

  {/* Boutons */}
  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-300">
    <Button
      type="button"
      variant="outline"
      onClick={() => setIsVariantDialogOpen(false)}
      disabled={isSubmittingVariant}
      className="bg-white hover:bg-gray-100"
    >
      Annuler
    </Button>
    <Button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white"
      disabled={isSubmittingVariant || taillesFields.length === 0}
    >
      {isSubmittingVariant ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Enregistrement...
        </>
      ) : editingVariant ? "Modifier la variante" : "Créer la variante"}
    </Button>
  </div>
</form>


 </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Articles ({filteredArticles.length})</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Prix de base</TableHead>
                <TableHead>Stock total</TableHead>
                <TableHead>Variantes</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {article.image && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${article.image}`}
                          alt={article.nom}
                          className="w-12 h-12 object-cover rounded-lg"
                          height={48}
                          width={48}
                        />
                      )}
                      <div>
                        <div className="font-medium">{article.nom}</div>
                        <div className="text-sm text-gray-500">{article.reference}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {article.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{article.prix}€</TableCell>
                  <TableCell>
                    {/* <Badge variant={getTotalStock(article) > 10 ? 'default' : 'destructive'}>
                      {getTotalStock(article)}
                    </Badge> */}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Palette size={12} />
                        {/* <span>{getVariantCount(article)}</span> */}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddVariant(article)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryName(article.categorie_id)}</TableCell>
                  <TableCell>{getCollectionName(article.collection_id ?? '')}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-red-600">
                      <Heart size={16} fill="currentColor" />
                      <span>{article.favoris?.length || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditArticle(article)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Détail des variantes */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          article.varietes.length > 0 && (
            <Card key={`varietes-${article.id}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package size={20} />
                  <span>Variantes de {article.nom}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {article.varietes.map((variant) => (
                    <div key={variant.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{variant.reference}</h4>
                        <Badge variant="outline" className="text-xs">
                          {variant.couleur}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Couleur:</span>
                          <span className="font-medium">{variant.couleur}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Stock total:</span>
                          <Badge variant={(variant.tailles?.reduce((total, t) => total + t.quantite, 0) || 0) > 10 ? 'default' : 'destructive'}>
                            {variant.tailles?.reduce((total, t) => total + t.quantite, 0) || 0}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Images:</span>
                          <span className="font-medium">{variant.images?.length || 0}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-medium text-gray-700">Tailles:</h5>
                        <div className="flex flex-wrap gap-1">
                          {variant.tailles?.map((taille, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {taille.taille}: {taille.quantite} ({taille.prix}€)
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditVariant(article, variant)}
                          className="flex-1"
                        >
                          <Edit size={14} className="mr-1" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteVariant(article.id, variant.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </div>
  );
}