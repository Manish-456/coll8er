import { features } from "@/constants/features";

import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <div className="p-4 ">
      <div className="uppercase text-sm font-medium  tracking-wide ">
        Powerful ways to grow
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold my-3">
        Do more with Coll8er.
      </h2>
      <div className="max-w-2xl ">
        <p className="tracking-wide md:text-base text-[15px] text-gray-700">
          Coll8er&apos;s intuitive features give any team the ability to quickly
          set up and customize workflows for just about anything.
        </p>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3">
        {features.map((feature) => (
          <FeatureCard data={feature} key={feature.image} />
        ))}
      </div>
    </div>
  );
}
