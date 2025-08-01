'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Edit } from 'lucide-react';
import { updateCollection } from '@/service-anvogue/collection/collection.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CreateCollectionSchema } from '@/service-anvogue/collection/collection.schema';
import { Collection } from '@/lib/types';
import { useSession } from 'next-auth/react';

const saisons = ['PRINTEMPS', 'ÉTÉ', 'AUTOMNE', 'HIVER', 'TOUTES_SAISONS'];

interface EditCollectionProps {
  collection: Collection;
}

export default function EditCollection({ collection }: EditCollectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCollectionSchema>({
    defaultValues: {
      nom: collection.nom,
      description: collection.description,
      saison: collection.saison as
        | 'PRINTEMPS'
        | 'ÉTÉ'
        | 'AUTOMNE'
        | 'HIVER'
        | 'TOUTES_SAISONS',
    },
  });

  const handleEdit = () => {
    if (!session) {
      toast.warning("Veuillez vous connecter pour modifier une collection.");
      router.push('/admin/connexion');
      return;
    }
    reset();
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: CreateCollectionSchema) => {
    try {
      const result = await updateCollection(collection.id, data);
      if (result.success && result.data) {
        toast.success('Collection modifiée avec succès');
      } else {
        toast.error(result.error || 'Erreur lors de la modification');
        return;
      }
      setIsDialogOpen(false);
      reset();
    } catch {
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      router.refresh();
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) reset();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la collection</DialogTitle>
          <DialogDescription>
            Apportez les modifications nécessaires à cette collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom de la collection</Label>
            <Input
              id="nom"
              {...register('nom')}
              placeholder="Ex: Collection Été 2025"
            />
            {errors.nom && <p className="text-sm text-destructive">{errors.nom.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Description de la collection..."
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="saison">Saison</Label>
            <Select
              onValueChange={(value) => setValue('saison', value )}
              defaultValue={collection.saison}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la saison" />
              </SelectTrigger>
              <SelectContent>
                {saisons.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.saison && <p className="text-sm text-destructive">{errors.saison.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'En cours...' : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
