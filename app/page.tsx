"use client"
import Image from "next/image";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const session = useSession()
  console.log(session)
  return (
    
      <main >
        <Navbar />
      </main>
      
   
  );
}
