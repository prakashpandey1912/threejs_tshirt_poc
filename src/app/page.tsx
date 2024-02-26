"use client";

import CustomizeSection from "@/components/CustomizeSelection/CustomizeSection";
import PriceDisplay from "@/components/PriceDisplay/PriceDisplay";
import ThreeScene from "@/components/Threejs/ThreeScene";
import { useState } from "react";

export type ModelSide = {
  key: string;
  name: string;
  value: string;
  isOpen: boolean;
  meshName: string;
};

export default function Home() {

  const [modelSide, setModelSide] = useState([
    { key: "Front", name: "Front", meshName:"Jersey_2" , value: "#628ec0", isOpen: false },
    { key: "Back", name: "Back", meshName:"Jersey_3" ,value: "#684c94", isOpen: false },
    { key: "Hand", name: "Hand", meshName:"Jersey_4" ,value: "#bc5997", isOpen: false },
    { key: "Collar", name: "Collar", meshName:"Jersey_1" ,value: "#3b5769", isOpen: false },
    { key: "Side", name: "Side", meshName:"Jersey_5" ,value: "#dfad07", isOpen: false },
  ]);


  return (
    <div className=" h-screen flex">
      <div className="bg-[#f2f0fa] relative flex-1">
      <ThreeScene modelSide={modelSide}/>
      <PriceDisplay />
      </div>
      <div className="flex flex-col w-[350px] h-screen ">
      <CustomizeSection modelSide={modelSide} setModelSide={setModelSide}/>
      </div>
    </div>
  );
}
