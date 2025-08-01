
import { Client, } from "@/lib/types";
import UserProfile from "./dashboard/UserProfile";






export   async  function  SectionCards({ client }: { client: Client[] }) {
  
  return (
    <div className="">
     
    <UserProfile client={client}  />
    
    </div>
  )
}
