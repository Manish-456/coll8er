import Link from "next/link";
import Image from "next/image";
import localFont from 'next/font/local';
import { cn } from "@/lib/utils";

const headingFont = localFont({
    src : "../public/fonts/font.woff2"
})

export function Logo() {
    
  return (
    <Link href={"/"}>
      <div className={"hover:opacity-75 transition text-center gap-x-2 hidden md:flex"}>
        <Image src={"/logo.svg"} alt="logo" height={20} width={20} />
        <p className={cn("text-lg text-neutral-700 mt-1", headingFont.className)}>Coll8er</p>
      </div>
    </Link>
  );
}
