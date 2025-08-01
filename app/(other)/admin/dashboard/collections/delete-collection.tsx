'use client';

import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { deleteCollection } from '@/service-anvogue/collection/collection.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Collection } from '@/lib/types';
import { CreateCollectionSchema } from '@/service-anvogue/collection/collection.schema';
import { useSession } from 'next-auth/react';

interface DeleteCollectionProps {
  collection: Collection;
}

export default function DeleteCollection({ collection }: DeleteCollectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { data: session,  } = useSession();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateCollectionSchema>();

  const handleEdit = () => {
    if (!session) {
      toast.warning("Veuillez vous connecter pour continuer");
      router.push('/admin/connexion');
      return;
    }
    reset();
    setIsDialogOpen(true);
  };

  const onSubmit = async () => {
    try {
      const result = await deleteCollection(collection.id);
      if (result.success && result.data) {
        toast.success("Collection supprimée avec succès");
      } else {
        toast.error(result.error || "Erreur lors de la suppression");
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
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={handleEdit}>
          <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer la Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4">
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogClose(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'En cours...' : 'Supprimer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
