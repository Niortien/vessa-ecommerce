"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  ConnexionClientOtpSchema,
} from "@/service-anvogue/authentification/authentification.schema";
import { useEffect, useState } from "react";

export default function InputOTPDemo() {
  const router = useRouter();

  const [emailForLocalStorage, setEmailForLocalStorage] = useState("");
  useEffect(() => {
    const storedEmail = window.localStorage.getItem("emai");
    if (storedEmail) {
      setEmailForLocalStorage(storedEmail);
    }
  }, []);

  const {
    control,
    handleSubmit,
  } = useForm<Omit<ConnexionClientOtpSchema, "email">>();

  const handleConnexion: SubmitHandler<
    Omit<ConnexionClientOtpSchema, "email">
  > = async (data) => {
    const res = await signIn("credentials-client", {
      email: emailForLocalStorage,
      otp: data.otp,
      redirect: false,
    });

    console.log("signIn response", res?.error);

    if (res?.error) {
      toast.error(res.error);
    } else {
      window.localStorage.removeItem("emai"); // Stockage du token
      toast.success("Connexion réussie !");
      router.push("/home"); // Redirection après succès
    }
  };

  // Vérification de l'authentification
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 w-full flex items-center justify-center p-4">
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  {" "}
                </h1>
                <div className="w-12 h-1 bg-orange-500 rounded" />
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Connexion
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                Bienvenue dans votre tableau de bord
              </p>

              <form
                onSubmit={handleSubmit(handleConnexion)}
                className="space-y-6"
              >
                <div className="w-full">
                  <label htmlFor="email" className="mb-4 font-bold">
                    Votre email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={emailForLocalStorage}
                    id="email"
                    disabled
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <Controller
                  name="otp"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="w-full">
                      <label htmlFor="otp" className="mb-4 font-bold">
                        Code de confirmation
                      </label>
                      <InputOTP {...field} id="otp" maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  )}
                />

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-all font-medium shadow-lg"
                >
                  Se connecter
                </button>
              </form>
            </div>

            {/* Illustration */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-orange-100 to-orange-200 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
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
                      <div className="w-full h-2 bg-orange-200 rounded"></div>
                      <div className="w-full h-2 bg-orange-300 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-full h-2 bg-orange-100 rounded"></div>
                    </div>
                    <div className="flex items-center justify-center my-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-end space-x-2 justify-center">
                      <div className="w-4 h-8 bg-orange-300 rounded-t"></div>
                      <div className="w-4 h-12 bg-orange-400 rounded-t"></div>
                      <div className="w-4 h-6 bg-orange-300 rounded-t"></div>
                      <div className="w-4 h-10 bg-orange-400 rounded-t"></div>
                    </div>
                  </div>
                </div>

                {/* Personnages */}
                <div className="flex justify-between items-end">
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-orange-600 rounded-full mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-16 bg-orange-600 rounded-lg"></div>
                    <div className="w-8 h-8 bg-orange-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-orange-700 rounded-full mb-2 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="w-12 h-16 bg-orange-700 rounded-lg"></div>
                    <div className="w-8 h-8 bg-orange-700 rounded-full mt-2"></div>
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
