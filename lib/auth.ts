import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthResponse, AuthResponseClient, ErrorResponse } from "./types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials-admin",
      name: "CredentialsAdmin",
      credentials: {
        email: { type: "text", label: "Email" },
        password: { type: "password", label: "Mot de passe" },
      },
      authorize: async (credentials) => {

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe sont requis");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/connexion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          const error = (await response.json()) as ErrorResponse;
          throw new Error("Erreur: " + (error?.message || "Erreur de connexion"));
        }

        const data = (await response.json()) as AuthResponse;
        const user = data.user;

        return {
          id: user.id,
          name: user.nomComplet,
          email: user.email,
          image: user.avatar || null,
        };
      },
    }),
    // Provider pour la connexion client
    CredentialsProvider({
      id: "credentials-client",
      name: "CredentialsClient",
      credentials: {
        email: { type: "text", label: "Email" },
        otp: { type: "text", label: "OTP" },
      },
      authorize: async (credentials) => {

        if (!credentials?.email || !credentials?.otp) {
          throw new Error("Email et mot de passe sont requis");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            otp: credentials.otp,
          }),
        });

        if (!response.ok) {
          const error = (await response.json()) as ErrorResponse;
          throw new Error("Erreur: " + (error?.message || "Erreur de connexion"));
        }

        const data = (await response.json()) as AuthResponseClient ;
        const user = data.user;
        console.log("Response status:", data);

        return {
          id: user.id,
          name: user.nomUtilisateur,
          email: user.email,
          image: user.avatar|| null,
        };
      },
    }),
  ],
  // pages: {
  //   signIn: "/admin/connexion",
  // },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours //TODO: Vérifier si c'est nécessaire pour le backend
  },
  // secret: process.env.AUTH_SECRET,
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.email = user.email;
  //       token.picture = user.image;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.user.id = token.id as string;
  //       session.user.name = token.name as string;
  //       session.user.email = token.email as string;
  //       session.user.image = token.picture as string | null;
  //     }
  //     return session;
  //   },
  // },
});
