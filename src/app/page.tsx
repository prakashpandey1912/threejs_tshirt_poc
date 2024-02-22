"use client";

import CustomizeSection from "@/components/CustomizeSelection/CustomizeSection";
import PriceDisplay from "@/components/PriceDisplay/PriceDisplay";
import ThreeScene from "@/components/Threejs/ThreeScene";

export default function Home() {
  return (
    <div className=" h-screen flex">
      <div className="bg-[#f2f0fa] relative flex-1">
      <ThreeScene />
      <PriceDisplay />
      </div>
      <div className="flex flex-col w-[350px] h-screen ">
      <CustomizeSection/>
      </div>
    </div>
  );
}
