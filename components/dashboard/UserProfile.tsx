"use client";

import Image from "next/image";
import { BadgeCheck, Instagram, Youtube,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Client } from "@/lib/types";



export default function UserProfile({ client }: { client: Client[] }) {
     const { data: session } = useSession();
     console.log("client user",client)
  return (
    <section className="min-h-screen bg-[#121212] text-white p-6 md:p-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Profile</h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Avatar + Nom */}
        <div className="flex flex-col items-center bg-[#1e1e1e] p-6 rounded-2xl shadow-lg">
          <div className="w-40 h-40 relative mb-4">
            <Image
             src={process.env.NEXT_PUBLIC_API_URL +"/"+ session?.user.image}
              alt="Avatar"
              fill
              className="rounded-full object-cover border-4 border-gray-700"
            />
          </div>
          <h2 className="text-2xl font-semibold">{session?.user?.name} </h2>
          <p className="text-green-400 flex items-center gap-1">
            <BadgeCheck className="w-4 h-4" /> 
            {session?.user?.email}
          </p>
        </div>

        {/* Bio & Infos */}
        <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg space-y-4">
          {/* <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">My Role</p>
              <p> {session?.user?.id} </p>
              
            </div>
            <div>
              <p className="text-gray-400">Experience Level</p>
              <p>Intermediate</p>
            </div>

            <div>
              <p className="text-gray-400">3 Favorite Artists</p>
              <p>Ninho, Travis Scott, Metro Boomin</p>
            </div>
            <div>
              <p className="text-gray-400">Music Genre</p>
              <p>Trap</p>
            </div>

            <div>
              <p className="text-gray-400">Software</p>
              <p>Ableton</p>
            </div>
            <div>
              <p className="text-gray-400">Music Mood</p>
              <p>Melancholic</p>
            </div>

            <div>
              <p className="text-gray-400">City</p>
              <p>California, USA</p>
            </div>
            <div>
              <p className="text-gray-400">Availability</p>
              <p className="text-green-500 font-medium">✔ Available for collaboration</p>
            </div>
          </div> */}

          <div className="flex gap-2 text-sm">
            Mes commandes
          </div>
        </div>
      </div>

      {/* Réseaux Sociaux */}
      <div className="mt-10 bg-[#1e1e1e] p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Social Media</h3>
        <div className="flex gap-4">
          <Button variant="ghost">
            <Youtube className="text-red-500" />
          </Button>
          <Button variant="ghost">
            <Instagram className="text-pink-500" />
          </Button>
          <Button variant="ghost">
           
          </Button>
        </div>
      </div>
    </section>
  );
}
