


import { SectionCards } from "@/components/section-cards"
import { Button } from "@/components/ui/button"

import {

  SidebarProvider,
} from "@/components/ui/sidebar"


import { Client } from "@/lib/types"


export default async function Page() {
   const reponse=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`)
    const client:Client[]=await reponse.json()
   

    
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
  
  
      
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
          <Button className="w-54"> Revenir sur mes articles</Button>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards client={client}  />
              <div className="px-4 lg:px-6">
              
              </div>
            
            </div>
          </div>
        </div>
     
    </SidebarProvider>
  )
}
