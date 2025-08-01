"use server";

import {
  createCommandeSchema,
  updateCommandeSchema,
  CreateCommandeSchema,
  UpdateCommandeSchema,
} from "./commande.schema"; // ton fichier Zod pour commande

import { BASE_URL } from "../base-url";

const CommandeAPI = {
  create: {
    endpoint: `${BASE_URL}/commande`,
    method: "POST",
  },
  getAll: {
    endpoint: () => `${BASE_URL}/commande`,
    method: "GET",
  },
  getOne: {
    endpoint: (commandeID: string) => `${BASE_URL}/commande/${commandeID}`,
    method: "GET",
  },
  update: {
    endpoint: (commandeID: string) => `${BASE_URL}/commande/${commandeID}`,
    method: "PATCH",
  },
  delete: {
    endpoint: (commandeID: string) => `${BASE_URL}/commande/${commandeID}`,
    method: "DELETE",
  },
};

// CREATE COMMANDE
export const createCommande = async (body: CreateCommandeSchema) => {
  const { data, success } = createCommandeSchema.safeParse(body);
  if (!success) {
    return { success: false, error: "Erreur de validation" };
  }

  const response = await fetch(CommandeAPI.create.endpoint, {
    method: CommandeAPI.create.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// GET ALL COMMANDES
export const getAllCommandes = async () => {
  try {
    const response = await fetch(CommandeAPI.getAll.endpoint(), {
      method: CommandeAPI.getAll.method,
    });

    if (!response.ok) return [];
    const responseData = await response.json();

    return responseData;
  } catch {
    return [];
  }
};

// GET ONE COMMANDE
export const getOneCommande = async (commandeID: string) => {
  const response = await fetch(CommandeAPI.getOne.endpoint(commandeID), {
    method: CommandeAPI.getOne.method,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// UPDATE COMMANDE
export const updateCommande = async (
  commandeID: string,
  body: UpdateCommandeSchema
) => {
  const { data, success } = updateCommandeSchema.safeParse(body);
  if (!success) {
    return { success: false, error: "Erreur de validation" };
  }

  const response = await fetch(CommandeAPI.update.endpoint(commandeID), {
    method: CommandeAPI.update.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// DELETE COMMANDE
export const deleteCommande = async (commandeID: string) => {
  const response = await fetch(CommandeAPI.delete.endpoint(commandeID), {
    method: CommandeAPI.delete.method,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error:
        typeof responseData.message === "string"
          ? responseData.message
          : responseData.message[0],
    };
  }

  return { success: true, data: responseData };
};

// NOUVELLE FONCTION : GET COMMANDES BY CLIENT ID
export const getCommandesByClientId = async (clientId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/commande/client/${clientId}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || `Erreur ${response.status}` };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
};
