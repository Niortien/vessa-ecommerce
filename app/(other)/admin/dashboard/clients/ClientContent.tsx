'use client';
import React, { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Users, Mail, Phone, MapPin, ShoppingBag, Euro } from 'lucide-react';
import { Client, Commande } from '@/lib/types';

const ClientContent = ({ client, commande }: { client: Client[]; commande: Commande[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Calcule le total dépensé par client
 // Calcule le total dépensé par un client uniquement sur les commandes livrées
function calculateTotalSpent(clientId: string) {
  return commande
    .filter(
      (c) => c.client_id === clientId && c.statut === 'LIVREE'
    )
    .reduce((sum, c) => sum + (c.total ?? 0), 0);
}


  // Trouve la date de la dernière commande
  function getLastOrderDate(clientId: string) {
    const lastOrder = commande
      .filter((c) => c.client_id === clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return lastOrder ? new Date(lastOrder.date) : null;
  }

  // Enrichit chaque client avec totalSpent et lastOrderDate
  const clientsWithTotals = client.map((c) => ({
    ...c,
    totalSpent: calculateTotalSpent(c.id),
    lastOrderDate: getLastOrderDate(c.id),
  }));

  // Filtrage par recherche
  const filteredClients = clientsWithTotals.filter(
    (c) =>
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  // Statistiques globales
  const totalClients = client.length;
  const activeClients = client.filter((c) => c.isActive).length;
  const totalOrders = commande.length;
  const totalRevenue = commande.reduce((sum, c) => sum + (c.total ?? 0), 0);

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-1">Gérez votre base client</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients Actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commandes Totales</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CA Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalRevenue.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <Euro className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table des clients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Liste des Clients ({filteredClients.length})
              </CardTitle>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Rechercher un client..."
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
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Dépensé</TableHead>
                  <TableHead>Dernière commande</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => {
                  const nbCommandes = commande.filter((co) => co.client_id === client.id).length;

                  return (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{client.nom}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail size={14} />
                            {client.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone size={14} />
                          {client.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600 max-w-xs truncate">
                          <MapPin size={14} />
                          {client.adresse}
                        </div>
                      </TableCell>
                      {/* Affiche le nombre de commandes */}
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ShoppingBag size={12} />
                          {client.commandes?.length}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {client.totalSpent.toLocaleString('fr-FR')} FCFA
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {client.lastOrderDate
                          ? client.lastOrderDate.toLocaleDateString('fr-FR')
                          : '-'}
                      </TableCell>
                      {/* Badge Statut avec bg vert ou rouge selon isActive */}
                      <TableCell>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${
                            client.isActive ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {client.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientContent;
