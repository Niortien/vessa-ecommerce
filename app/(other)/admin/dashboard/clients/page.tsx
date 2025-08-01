
import { Client, Commande } from "@/lib/types";
import ClientContent from "./ClientContent";
import { getAllCommandes } from "@/service-anvogue/client/client.action";


export default async function  ClientsPage() {
  const reponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`)
const client:Client[]=await reponse.json()
const commande:Commande[]=await getAllCommandes()

console.log("tableau de client",client)
  return (
   <div>
    <ClientContent
     client={client}
     commande={commande}
     />
   </div>
  );
}