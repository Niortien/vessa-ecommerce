"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  inscriptionUtilisateurSchema,
  InscriptionUtilisateurSchema,
} from "@/service-anvogue/authentification/authentification.schema";
import { inscription } from "@/service-anvogue/authentification/authentification.action";

export default function InscriptionPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InscriptionUtilisateurSchema>({
    resolver: zodResolver(inscriptionUtilisateurSchema),
  });

  const onSubmit = async (data: InscriptionUtilisateurSchema) => {
    const payload = {
      ...data,
      avatar: avatarFile ?? undefined,
      genre: data.genre as "HOMME" | "FEMME",
      role: data.role as "ADMIN" | "CAISSE",
      date_naissance: data.date_naissance,
    };

    const result = await inscription(payload);

    if (result.success) {
      toast.success("Inscription réussie !");
      router.push("/admin/connexion");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4 relative">
      {/* Déco fond */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-green-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-green-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-40 right-40 w-16 h-16 bg-green-300 rounded-full opacity-60"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px]">
          {/* FORMULAIRE */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Créer un compte Utilisateur</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                {...register("nomComplet")}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.nomComplet && <p className="text-red-500 text-sm">{errors.nomComplet.message}</p>}

              <input
                type="text"
                placeholder="Nom d'utilisateur"
                {...register("nomUtilisateur")}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.nomUtilisateur && <p className="text-red-500 text-sm">{errors.nomUtilisateur.message}</p>}

              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  {...register("password")}
                  className="w-full px-4 py-2 border rounded-md pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <input
                type="date"
                {...register("date_naissance")}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.date_naissance && <p className="text-red-500 text-sm">{errors.date_naissance.message}</p>}

              <select {...register("genre")} className="w-full px-4 py-2 border rounded-md">
                <option value="">Sélectionner un genre</option>
                <option value="HOMME">HOMME</option>
                <option value="FEMME">FEMME</option>
              </select>
              {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}

              <select {...register("role")} className="w-full px-4 py-2 border rounded-md">
                <option value="">Sélectionner un rôle</option>
                <option value="ADMIN">ADMIN</option>
                <option value="CAISSE">CAISSE</option>
                <option value="GESTIONNAIRE">GESTIONNAIRE</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setAvatarFile(file);
                }}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>

          {/* ILLUSTRATION */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-100 to-green-200 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-xl shadow-2xl p-6 mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-full h-2 bg-green-200 rounded"></div>
                    <div className="w-full h-2 bg-green-300 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-full h-2 bg-green-100 rounded"></div>
                  </div>
                  <div className="flex items-center justify-center my-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-end space-x-2 justify-center">
                    <div className="w-4 h-8 bg-green-300 rounded-t"></div>
                    <div className="w-4 h-12 bg-green-400 rounded-t"></div>
                    <div className="w-4 h-6 bg-green-300 rounded-t"></div>
                    <div className="w-4 h-10 bg-green-400 rounded-t"></div>
                  </div>
                </div>
              </div>

              {/* Petits personnages */}
              <div className="flex justify-between items-end">
                <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-green-600 rounded-full mb-2 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <div className="w-12 h-16 bg-green-600 rounded-lg"></div>
                  <div className="w-8 h-8 bg-green-600 rounded-full mt-2"></div>
                </div>
                <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-green-700 rounded-full mb-2 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <div className="w-12 h-16 bg-green-700 rounded-lg"></div>
                  <div className="w-8 h-8 bg-green-700 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
          </div>
          {/* FIN illustration */}
        </div>
      </div>
    </div>
  );
}
