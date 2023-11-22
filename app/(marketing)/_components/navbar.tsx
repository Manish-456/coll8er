"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollTracker = () => {
      if(window.scrollY > 0){
        setIsScrolled(true);
      }else{
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', scrollTracker);

    return () => window.removeEventListener('scroll', scrollTracker);
  }, [setIsScrolled]);

  return (
    <div className={cn("fixed top-0 w-full h-14 transition duration-75 px-4  flex z-[9999] items-center", {
      "bg-white shadow-sm" : isScrolled
    })}>
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"ghost"} asChild>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button variant={"primary"} asChild size={"sm"}>
            <Link href={"/sign-up"}>Get Coll8er for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
