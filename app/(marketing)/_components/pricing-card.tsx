"use client";

import {type Pricing } from "@/constants/pricing";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface PricingCardProps {
    data : Pricing
}
export function PricingCard({data} : PricingCardProps) {
  const router = useRouter();

  const onClick = () => router.push(`/sign-up`);

  return (
    <div className={cn("w-full relative shadow-md py-6 px-8 rounded-md bg-white", data.type === "premium" ? "border-2 border-cyan-500" : "")}>
      <p className={cn("uppercase font-medium", data.type === "free" ? "text-slate-800/90" : "text-sky-500")}>{data.type}</p>
      <div className="mt-2">
         <h3 className="text-4xl">
            <span className="text-sm mr-0.5 font-medium text-slate-600">$</span>
            {data.price}
            <span className="text-sm ml-0.5 font-medium text-slate-600">USD</span>
         </h3>
         <p className="text-xs text-neutral-700 font-medium mb-2">
            {data.type === "free" ? "Free for your whole team" : "Per month"}
         </p>
      </div>
      <div className="font-medium text-[15px]  text-slate-700">
        {data.description}
      </div>
      <ol className="list-disc space-y-1.5 mb-12 px-4 py-2">
          {
            data.features.map((feature, idx) => (
                <li className="text-sm capitalize font-medium text-slate-600" key={idx}>{feature}</li>
            ))
          }
      </ol>
          <Button onClick={onClick} className="absolute bottom-4" variant={data.type === "free" ? "outline" : "primary"}>
            {
                data.type === "free" ? "Get started" : "Try for free"
            }
          </Button>
    </div>
  )
}
