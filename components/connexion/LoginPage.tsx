"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import {
  connexionUtilisateurSchema,
  ConnexionUtilisateurSchema,
} from "@/service-anvogue/authentification/authentification.schema";

import Link from "next/link";


export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConnexionUtilisateurSchema>({
    resolver: zodResolver(connexionUtilisateurSchema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConnexion: SubmitHandler<ConnexionUtilisateurSchema> = async (data) => {


  const res = await signIn("credentials-admin", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
  console.log("signIn response", res?.error);


  if (res?.error) {
    toast.error(res.error);
  } else {
    toast.success("Connexion réussie !");
    router.push("/admin/dashboard"); // Redirection vers le tableau de bord
  }
};

// Fonction de déconnexion
// Utilise signOut de next-auth pour gérer la déconnexion
//  const handleDeconnexion = async () => {
//   try {
//     await signOut({ redirect: false }); // ❗️ redirect false = pas de redirection automatique
//     toast.success("Déconnexion réussie !");
//     // Optionnel : rediriger manuellement
//      router.push("/connexion");// ou `router.push("/connexion")` si tu es dans un composant React
//   } catch (error) {
//     toast.error("Erreur lors de la déconnexion.");
//   }
// };




 
  // Vérification de l'authentification
;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      {/* Décors de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-40 right-40 w-16 h-16 bg-blue-300 rounded-full opacity-60"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Formulaire */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">   </h1>
                <div className="w-12 h-1 bg-blue-500 rounded" />
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Connexion d&apos; utilisateur</h2>
              <p className="text-gray-600 mb-8 text-sm">Bienvenue dans votre tableau de bord</p>

              <form onSubmit={handleSubmit(handleConnexion)} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="exemple@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Entrez votre mot de passe"
                      className={`w-full px-4 py-3 border rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg"
                >
                  Se connecter
                </button>
                <p className="text-center text-gray-600 text-sm mt-4 flex items-center justify-center">
                  Pas encore de compte ?{" "} </p>
                  <Link href="/admin/inscription" className="text-blue-600 hover:underline">
                   
                   <button
                 
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg"
                >
                  Inscrivez vous ici
                </button>
                  </Link>  
              </form>
            </div>

            {/* Illustration */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full max-w-md">
                {/* Écran de dashboard */}
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
                      <div className="w-full h-2 bg-blue-200 rounded"></div>
                      <div className="w-full h-2 bg-blue-300 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-full h-2 bg-blue-100 rounded"></div>
                    </div>
                    <div className="flex items-center justify-center my-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-end space-x-2 justify-center">
                      <div className="w-4 h-8 bg-blue-300 rounded-t"></div>
                      <div className="w-4 h-12 bg-blue-400 rounded-t"></div>
                      <div className="w-4 h-6 bg-blue-300 rounded-t"></div>
                      <div className="w-4 h-10 bg-blue-400 rounded-t"></div>
                    </div>
                  </div>
                </div>

                {/* Personnages */}
                <div className="flex justify-between items-end">
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-blue-600 rounded-full mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-16 bg-blue-600 rounded-lg"></div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-blue-700 rounded-full mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-16 bg-blue-700 rounded-lg"></div>
                    <div className="w-8 h-8 bg-blue-700 rounded-full mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Fin Illustration */}
          </div>
        </div>
      </div>
    </div>
  );
}
