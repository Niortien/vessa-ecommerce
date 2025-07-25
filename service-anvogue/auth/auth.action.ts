"use server";

import { BASE_URL } from "../base-url";
import { InscriptionSchema, ConnexionSchema, inscriptionSchema, connexionSchema } from "./auth.schema";

const AuthAPI = {
    inscription: {
        endpoint: `${BASE_URL}/auth/inscription`,
        method: "POST",
    },
    connexion: {
        endpoint: `${BASE_URL}/auth/connexion`,
        method: "POST",
    },
    profile: {
        endpoint: `${BASE_URL}/auth/profile`,
        method: "GET",
    }
}

export const inscription = async (body: InscriptionSchema) => {
    // Validation des données
    const { data, success, error } = inscriptionSchema.safeParse(body)
    if (!success) {
        return {
            success: false,
            error: "Erreur de validation"
        };
    }
    // Transformation des données en FormData
    const formData = new FormData();
    formData.append("email", data.email);
     formData.append("role", data.role);
    formData.append("password", data.password);
    formData.append("nomComplet", data.nomComplet);
    formData.append("nomUtilisateur", data.nomUtilisateur);
    formData.append("ate_naissance", new Date(data.date_naissance).toISOString());

    if (data.avatar) {
        formData.append("image", data.avatar);
    }

    // Requête
    const response = await fetch(AuthAPI.inscription.endpoint, {
        method: AuthAPI.inscription.method,
        body: formData
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };

}

 


export const profile = async (token: string) => {
    // Requête
    const response = await fetch(AuthAPI.profile.endpoint, {
        method: AuthAPI.profile.method,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    // Récupération des données de la réponse
    const responseData = await response.json();

    if (!response.ok) {
        return {
            success: false,
            error: typeof responseData.message === "string" ? responseData.message : responseData.message[0]
        };
    }

    return {
        success: true,
        data: responseData
    };
}
