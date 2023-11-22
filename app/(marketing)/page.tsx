import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pricing } from "./_components/pricing";
import { Features } from "./_components/features";
import { Partners } from "./_components/partners";
import { Action } from "./_components/action";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MarketingPage() {
  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div
          className={cn(
            "flex items-center justify-center flex-col",
            headingFont.className
          )}
        >
          <div className="mb-4 flex items-center border shadow-sm p-4 bg-cyan-400/40 rounded-full text-slate-600 uppercase">
            <Medal className="h-6 w-6 mr-2" />
            No 1 task Management.
          </div>
          <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
            Coll8er enhances teams,
          </h1>
          <div className="text-3xl md:text-6xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 p-2 text-white rounded-md pb-4 w-fit">
            driving progress.
          </div>
        </div>
        <div
          className={cn(
            "text-sm text-neutral-500 mt-4 max-w-xs md:max-w-2xl text-center md:text-xl mx-auto",
            textFont.className
          )}
        >
          Brings all your task, teammates, and tools together. Simple, flexible,
          and powerful. All it takes are boards, lists, and cards to get a clear
          view of who’s doing what and what needs to get done.
        </div>

        <Button variant={"primary"} className="mt-6" size={"lg"} asChild>
          <Link href={"/sign-up"}>Get Coll8er for free.</Link>
        </Button>
      </div>
      <div
        className={cn(
          "mt-12 space-y-8 md:mt-24 max-w-6xl mx-auto p-1 md:p-4",
          textFont.className
        )}
      >
        <Features />
        <Action />
        <Pricing />
        <Partners />
      </div>
    </div>
  );
}
